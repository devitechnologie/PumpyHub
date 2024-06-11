import { Content, filter } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import initTranslations from "@/app/i18n";
import ListPagination from "@/components/ListPagination";
import RecipesCard from "@/components/RecipesCard";
import Search from "@/components/Search";
import SelectCategory from "@/components/SelectCategory";
import SelectIngredients from "@/components/SelectIngredients";
import Tags from "@/components/Tags";
import Divider from "@/components/ui/Divider";
import Heading from "@/components/ui/Heading";
import Bounded from "@/components/wrappers/Bounded";
import { createClient } from "@/prismicio";
import { getShortLocale } from "@/utils/helpers";

/**
 * Props for `RecipesList`.
 */
export type RecipesListProps = SliceComponentProps<Content.RecipesListSlice, { lang?: string, searchParams?: URLSearchParams }>

/**
 * Component for "RecipesList" Slices.
 */
const RecipesList = async ({ slice, context }: RecipesListProps): Promise<JSX.Element> => {
  const searchParams = context.searchParams as unknown as { search?: string, page?: string, category?: string, tag?: string, ingredient?: string }
  const selectedIngredients = searchParams.ingredient ? new Set(JSON.parse(searchParams.ingredient)) as Set<string> : new Set<string>()

  const client = createClient()
  const { t } = await initTranslations(getShortLocale(context.lang as string), ['*'], null, null)
  const settings = await client.getSingle("settings", { lang: context.lang })

  const LatestRecipes = await client.getAllByType("recipespage",
    {
      limit: 3,
      lang: context.lang,
      orderings: {
        field: 'document.publication_date',
        direction: 'desc'
      }
    }
  )

  const filtersBy = [
    filter.fulltext('document', searchParams.search || ''),
    filter.at('document.type', 'recipespage'),
  ]

  if (searchParams.category) {
    filtersBy.push(filter.at('my.recipespage.periods.period', searchParams.category))
  }

  if (selectedIngredients.size > 0) {
    filtersBy.push(filter.any('my.recipespage.ingredients.ingredient', Array.from(selectedIngredients)))
  }

  if (searchParams.tag) {
    filtersBy.push(filter.at('document.tags', [searchParams.tag]))
  }

  const paginatedRecipes = await client.getByType("recipespage",
    {
      lang: context.lang,
      orderings: {
        field: 'document.first_publication_date',
        direction: 'desc'
      },
      pageSize: 4,
      page: searchParams.page ? parseInt(searchParams.page) : 1,
      filters: filtersBy
    }
  )
  // ingredients ingredient

  const ingredients = await client.getAllByType("recipes_ingredient",
    {
      lang: context.lang,
      orderings: {
        field: 'document.first_publication_date',
        direction: 'desc'
      }
    }
  )

  const categories = await client.getAllByType("recipes_period",
    {
      lang: context.lang,
      orderings: {
        field: 'document.first_publication_date',
        direction: 'desc'
      }
    }
  )

  const allRecipesCat = await client.getAllByType("recipespage",
    {
      lang: context.lang,
      orderings: {
        field: 'document.first_publication_date',
        direction: 'desc'
      },
      fetch: ['recipespage.periods'],
    }
  )
  const totalRecipesWithCats = allRecipesCat.map(recipes => recipes.data.periods).flat()

  // get all tags from all Recipes
  const allTags = await client.getAllByType("recipespage",
    {
      lang: context.lang,
      fetch: ['recipespage.tags'],
    }
  )
  const totalRecipesWithTags = Array.from(new Set(allTags.map(recipes => recipes.tags).flat()));

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="section-py flex flex-wrap gap-4 md:gap-0"
    >
      <div className="md:w-[70%]">
        <RecipesListSection recipes={paginatedRecipes.results} t={t} settings={settings} />
        <ListPagination
          totalPages={paginatedRecipes.total_pages}
          currentPage={paginatedRecipes.page}
        />
      </div>
      <aside className="md:w-[30%] md:pl-12 space-y-4 mt-4 sm:mt-0 overflow-hidden">
        <Search />
        <SmallLatestRecipes recipes={LatestRecipes} t={t} settings={settings} />
        <Divider />
        <Categories
          categories={categories}
          totalRecipesWithCats={totalRecipesWithCats}
          selectedCategory={searchParams.category}
          t={t}
        />
        <Divider />
        <Tags
          tags={totalRecipesWithTags}
          selectedTag={searchParams.tag}
        />
        <Divider />
        <Ingredients
          ingredients={ingredients}
          selectedIngredients={selectedIngredients}
          t={t}
        />
      </aside>
    </Bounded>
  );
};

const RecipesListSection = ({ recipes, t, settings }: { recipes: Content.RecipespageDocument[], t: any, settings: Content.SettingsDocument }) => {
  return (
    <div
      className="grid grid-cols-1 gap-4 md:gap-8 w-full"
    >
      {
        recipes.map((data) => (
          <RecipesCard
            key={data.id}
            recipes={data}
            horizontal
            borderRadius={settings.data.images_raduis || undefined}
          />
        ))
      }
      {
        recipes.length === 0 && (
          <div
            className="flex justify-center items-center w-full h-[300px]"
          >
            <Heading
              as="h4"
              variant="h4"
              className="text-primary-green-dark-dwm"
            >
              {t('no_recipes_found')}
            </Heading>
          </div>
        )
      }
    </div>
  )
}

const SmallLatestRecipes = ({ recipes, t, settings }: { recipes: Content.RecipespageDocument[], t: any, settings: Content.SettingsDocument }) => {
  return (
    <div>
      <Heading
        as="h3"
        variant="h3"
        className="text-primary-green-dark-dwm"
      >
        {
          t('latest_recipes')
        }
      </Heading>
      <div
        className="grid grid-cols-1 gap-4 mt-4"
      >
        {
          recipes.slice(0, 3).map((data) => (
            <RecipesCard
              key={data.id}
              recipes={data}
              horizontal
              size="small"
              isLatest
              borderRadius={settings.data.images_raduis || undefined}
            />
          ))
        }
      </div>
    </div>
  )
}

const Categories = ({
  categories,
  totalRecipesWithCats,
  selectedCategory,
  t
}: {
  categories: Content.RecipesPeriodDocument[],
  totalRecipesWithCats: Content.RecipespageDocumentDataPeriodsItem[],
  selectedCategory?: string,
  t: any
}) => {

  return (
    <div>
      <Heading
        as="h3"
        variant="h3"
        className="text-primary-green-dark-dwm"
      >
        {
          t('recipes_period')
        }
      </Heading>
      <div
        className="space-y-4 mt-4"
      >
        {
          categories.map((data) => (
            <SelectCategory
              key={data.id}
              idCategory={data.id}
              count={totalRecipesWithCats.filter(cat => (cat?.period as any)?.id === data.id).length}
              name={data.data.name as string}
              isSelected={selectedCategory === data.id}
            />
          ))
        }
      </div>
    </div>
  )
}

const Ingredients = ({
  ingredients,
  selectedIngredients,
  t
}: {
  ingredients: Content.RecipesIngredientDocument[],
  selectedIngredients: Set<string>,
  t: any
}) => {
  return (
    <div>
      <Heading
        as="h3"
        variant="h3"
        className="text-primary-green-dark-dwm"
      >
        {
          t('ingredients')
        }
      </Heading>
      <div
        className="mt-4 flex flex-wrap gap-2"
      >
        {
          ingredients.map((data) => (
            <SelectIngredients
              key={data.id}
              idIngredients={data.id}
              name={data.data.name as string}
              isSelected={selectedIngredients.has(data.id)}
            />
          ))
        }
      </div>
    </div>
  )
}

export default RecipesList;
