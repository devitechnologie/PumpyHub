import { Content, filter } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import initTranslations from "@/app/i18n";
import JobsCard from "@/components/JobsCard";
import ListPagination from "@/components/ListPagination";
import Search from "@/components/Search";
import SelectCategory from "@/components/SelectCategory";
import Tags from "@/components/Tags";
import Divider from "@/components/ui/Divider";
import Heading from "@/components/ui/Heading";
import Bounded from "@/components/wrappers/Bounded";
import { createClient } from "@/prismicio";
import { getShortLocale } from "@/utils/helpers";

/**
 * Props for `JobsList`.
 */
export type JobsListProps = SliceComponentProps<Content.JobsListSlice, { lang?: string, searchParams?: URLSearchParams }>

/**
 * Component for "JobsList" Slices.
 */
const JobsList = async ({ slice, context }: JobsListProps): Promise<JSX.Element> => {
  const searchParams = context.searchParams as unknown as { search?: string, page?: string, category?: string, tag?: string }
  const client = createClient()
  const { t } = await initTranslations(getShortLocale(context.lang as string), ['*'], null, null)
  const settings = await client.getSingle("settings", { lang: context.lang })

  const latestJobs = await client.getAllByType("jobspage",
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
    filter.at('document.type', 'jobspage'),
  ]

  if (searchParams.category) {
    filtersBy.push(filter.at('my.jobspage.categories.categorie', searchParams.category))
  }

  if (searchParams.tag) {
    filtersBy.push(filter.at('document.tags', [searchParams.tag]))
  }

  const paginatedJobs = await client.getByType("jobspage",
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

  const categories = await client.getAllByType("jobs_category",
    {
      lang: context.lang,
      orderings: {
        field: 'document.first_publication_date',
        direction: 'desc'
      }
    }
  )

  const allJobsCat = await client.getAllByType("jobspage",
    {
      lang: context.lang,
      orderings: {
        field: 'document.first_publication_date',
        direction: 'desc'
      },
      fetch: ['jobspage.categories'],
    }
  )
  const totalJobsWithCats = allJobsCat.map(job => job.data.categories).flat()

  // get all tags from all Jobs
  const allTags = await client.getAllByType("jobspage",
    {
      lang: context.lang,
      fetch: ['jobspage.tags'],
    }
  )
  const totalJobsWithTags = Array.from(new Set(allTags.map(job => job.tags).flat()));

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="section-py flex flex-wrap gap-4 md:gap-0"
    >
      <div className="md:w-[70%]">
        <JobsListSection jobs={paginatedJobs.results} t={t} settings={settings} />
        <ListPagination
          totalPages={paginatedJobs.total_pages}
          currentPage={paginatedJobs.page}
        />
      </div>
      <aside className="md:w-[30%] md:pl-12 space-y-4 mt-4 sm:mt-0 overflow-hidden">
        <Search />
        <SmallLatestJobs jobs={latestJobs} t={t} settings={settings} />
        <Divider />
        <Categories
          categories={categories}
          totalJobsWithCats={totalJobsWithCats}
          selectedCategory={searchParams.category}
          t={t}
        />
        <Divider />
        <Tags
          tags={totalJobsWithTags}
          selectedTag={searchParams.tag}
        />
      </aside>
    </Bounded>
  );
};

const JobsListSection = ({ jobs, t, settings }: { jobs: Content.JobspageDocument[], t: any, settings: Content.SettingsDocument }) => {
  return (
    <div
      className="grid grid-cols-1 gap-4 md:gap-8 w-full"
    >
      {
        jobs.map((data) => (
          <JobsCard
            key={data.id}
            jobs={data}
            horizontal
            borderRadius={settings.data.images_raduis || undefined}
          />
        ))
      }
      {
        jobs.length === 0 && (
          <div
            className="flex justify-center items-center w-full h-[300px]"
          >
            <Heading
              as="h4"
              variant="h4"
              className="text-heading-secondary"
            >
              {t('no_jobs_found')}
            </Heading>
          </div>
        )
      }
    </div>
  )
}

const SmallLatestJobs = ({ jobs, t, settings }: { jobs: Content.JobspageDocument[], t: any, settings: Content.SettingsDocument }) => {
  return (
    <div>
      <Heading
        as="h3"
        variant="h3"
        className="text-heading-secondary"
      >
        {
          t('latest_jobs')
        }
      </Heading>
      <div
        className="grid grid-cols-1 gap-4 mt-4"
      >
        {
          jobs.slice(0, 3).map((data) => (
            <JobsCard
              key={data.id}
              jobs={data}
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
  totalJobsWithCats,
  selectedCategory,
  t
}: {
  categories: Content.JobsCategoryDocument[],
  totalJobsWithCats: Content.JobspageDocumentDataCategoriesItem[],
  selectedCategory?: string,
  t: any
}) => {
  return (
    <div>
      <Heading
        as="h3"
        variant="h3"
        className="text-heading-secondary"
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
              count={totalJobsWithCats.filter(cat => (cat.categorie as any).id === data.id).length}
              name={data.data.name as string}
              isSelected={selectedCategory === data.id}
            />
          ))
        }
      </div>
    </div>
  )
}

export default JobsList;
