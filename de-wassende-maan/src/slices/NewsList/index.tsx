import { Content, filter } from "@prismicio/client"
import { SliceComponentProps } from "@prismicio/react"

import Bounded from "@/components/wrappers/Bounded"
import { createClient } from "@/prismicio"
import NewsCard from "@/components/NewsCard"
import Heading from "@/components/ui/Heading"
import Divider from "@/components/ui/Divider"
import Search from "@/components/Search"
import ListPagination from "@/components/ListPagination"
import SelectCategory from "@/components/SelectCategory"
import Tags from "@/components/Tags"
import { getShortLocale } from "@/utils/helpers"
import initTranslations from "@/app/i18n"

/**
 * Props for `NewsList`.
 */
export type NewsListProps = SliceComponentProps<Content.NewsListSlice, { lang?: string, searchParams?: URLSearchParams }>

/**
 * Component for "NewsList" Slices.
 */
const NewsList = async ({ slice, context }: NewsListProps): Promise<JSX.Element> => {
  const searchParams = context.searchParams as unknown as { search?: string, page?: string, category?: string, tag?: string }
  const client = createClient()
  const { t } = await initTranslations(getShortLocale(context.lang as string), ['*'], null, null)

  const latestNews = await client.getAllByType("newspage",
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
    filter.at('document.type', 'newspage'),
  ]

  if (searchParams.category) {
    filtersBy.push(filter.at('my.newspage.categories.categorie', searchParams.category))
  }

  if (searchParams.tag) {
    filtersBy.push(filter.at('document.tags', [searchParams.tag]))
  }

  const paginatedNews = await client.getByType("newspage",
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

  const categories = await client.getAllByType("news_category",
    {
      lang: context.lang,
      orderings: {
        field: 'document.first_publication_date',
        direction: 'desc'
      }
    }
  )

  const allNewsCat = await client.getAllByType("newspage",
    {
      lang: context.lang,
      orderings: {
        field: 'document.first_publication_date',
        direction: 'desc'
      },
      fetch: ['newspage.categories'],
    }
  )
  const totalNewsWithCats = allNewsCat.map(news => news.data.categories).flat()

  // get all tags from all news
  const allTags = await client.getAllByType("newspage",
    {
      lang: context.lang,
      fetch: ['newspage.tags'],
    }
  )
  const totalNewsWithTags = Array.from(new Set(allTags.map(news => news.tags).flat()));

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="section-py flex flex-wrap gap-4 md:gap-0"
    >
      <div className="md:w-[70%]">
        <NewsListSection news={paginatedNews.results} t={t} />
        <ListPagination
          totalPages={paginatedNews.total_pages}
          currentPage={paginatedNews.page}
        />
      </div>
      <aside className="md:w-[30%] md:pl-12 space-y-4 mt-4 sm:mt-0 overflow-hidden">
        <Search />
        <SmallLatestNews news={latestNews} t={t} />
        <Divider />
        <Categories
          categories={categories}
          totalNewsWithCats={totalNewsWithCats}
          selectedCategory={searchParams.category}
          t={t}
        />
        <Divider />
        <Tags
          tags={totalNewsWithTags}
          selectedTag={searchParams.tag}
        />
      </aside>
    </Bounded>
  )
}

const NewsListSection = ({ news, t }: { news: Content.NewspageDocument[], t: any }) => {
  return (
    <div
      className="grid grid-cols-1 gap-8 w-full"
    >
      {
        news.map((data) => (
          <NewsCard
            key={data.id}
            news={data}
            horizontal
          />
        ))
      }
      {
        news.length === 0 && (
          <div
            className="flex justify-center items-center w-full h-[300px]"
          >
            <Heading
              as="h4"
              variant="h4"
              className="text-primary-green-dark-dwm"
            >
              {t('no_news_found')}
            </Heading>
          </div>
        )
      }
    </div>
  )
}

const SmallLatestNews = ({ news, t }: { news: Content.NewspageDocument[], t: any }) => {
  return (
    <div>
      <Heading
        as="h3"
        variant="h3"
        className="text-primary-green-dark-dwm"
      >
        {
          t('latest_news')
        }
      </Heading>
      <div
        className="grid grid-cols-1 gap-4 mt-4"
      >
        {
          news.slice(0, 3).map((data) => (
            <NewsCard
              key={data.id}
              news={data}
              horizontal
              size="small"
              isLatest
            />
          ))
        }
      </div>
    </div>
  )
}

const Categories = ({
  categories,
  totalNewsWithCats,
  selectedCategory,
  t
}: {
  categories: Content.NewsCategoryDocument[],
  totalNewsWithCats: Content.NewspageDocumentDataCategoriesItem[],
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
          t('categories')
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
              count={totalNewsWithCats.filter(cat => (cat.categorie as any).id === data.id).length}
              name={data.data.name as string}
              isSelected={selectedCategory === data.id}
            />
          ))
        }
      </div>
    </div>
  )
}

export default NewsList
