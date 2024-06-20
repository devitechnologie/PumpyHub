import { Content, filter } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import initTranslations from "@/app/i18n";
import EventsCard from "@/components/EventsCard";
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
 * Props for `EventsList`.
 */
export type EventsListProps = SliceComponentProps<Content.EventsListSlice, { lang?: string, searchParams?: URLSearchParams }>

/**
 * Component for "EventsList" Slices.
 */
const EventsList = async ({ slice, context }: EventsListProps): Promise<JSX.Element> => {
  const searchParams = context.searchParams as unknown as { search?: string, page?: string, category?: string, tag?: string }
  const client = createClient()
  const { t } = await initTranslations(getShortLocale(context.lang as string), ['*'], null, null)
  const settings = await client.getSingle("settings", { lang: context.lang })

  const latestEvents = await client.getAllByType("eventpage",
    {
      limit: 3,
      lang: context.lang,
      orderings: {
        field: 'document.date_start',
        direction: 'desc'
      }
    }
  )

  const filtersBy = [
    filter.fulltext('document', searchParams.search || ''),
    filter.at('document.type', 'eventpage'),
  ]

  if (searchParams.category) {
    filtersBy.push(filter.at('my.eventpage.categories.categorie', searchParams.category))
  }

  if (searchParams.tag) {
    filtersBy.push(filter.at('document.tags', [searchParams.tag]))
  }

  const paginatedEvents = await client.getByType("eventpage",
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

  const categories = await client.getAllByType("events_category",
    {
      lang: context.lang,
      orderings: {
        field: 'document.first_publication_date',
        direction: 'desc'
      }
    }
  )

  const allEventsCat = await client.getAllByType("eventpage",
    {
      lang: context.lang,
      orderings: {
        field: 'document.first_publication_date',
        direction: 'desc'
      },
      fetch: ['eventpage.categories'],
    }
  )
  const totalEventsWithCats = allEventsCat.map(event => event.data.categories).flat()

  // get all tags from all Events
  const allTags = await client.getAllByType("eventpage",
    {
      lang: context.lang,
      fetch: ['eventpage.tags'],
    }
  )
  const totalEventWithTags = Array.from(new Set(allTags.map(event => event.tags).flat()));

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="section-py flex flex-wrap gap-4 md:gap-0"
    >
      <div className="md:w-[70%]">
        <EventsListSection events={paginatedEvents.results} t={t} settings={settings} />
        <ListPagination
          totalPages={paginatedEvents.total_pages}
          currentPage={paginatedEvents.page}
        />
      </div>
      <aside className="md:w-[30%] md:pl-12 space-y-4 mt-4 sm:mt-0 overflow-hidden">
        <Search />
        <SmallLatestEvents events={latestEvents} t={t} settings={settings} />
        <Divider />
        <Categories
          categories={categories}
          totalEventsWithCats={totalEventsWithCats}
          selectedCategory={searchParams.category}
          t={t}
        />
        <Divider />
        <Tags
          tags={totalEventWithTags}
          selectedTag={searchParams.tag}
        />
      </aside>
    </Bounded>
  );
};

const EventsListSection = ({ events, t, settings}: { events: Content.EventpageDocument[], t: any, settings: Content.SettingsDocument }) => {
  return (
    <div
      className="grid grid-cols-1 gap-4 md:gap-8 w-full"
    >
      {
        events.map((data) => (
          <EventsCard
            key={data.id}
            event={data}
            horizontal
            borderRadius={settings.data.images_raduis || undefined}
          />
        ))
      }
      {
        events.length === 0 && (
          <div
            className="flex justify-center items-center w-full h-[300px]"
          >
            <Heading
              as="h4"
              variant="h4"
              className="text-heading-secondary"
            >
              {t('no_events_found')}
            </Heading>
          </div>
        )
      }
    </div>
  )
}

const SmallLatestEvents = ({ events, t, settings }: { events: Content.EventpageDocument[], t: any, settings: Content.SettingsDocument }) => {
  return (
    <div>
      <Heading
        as="h3"
        variant="h3"
        className="text-heading-secondary"
      >
        {
          t('latest_events')
        }
      </Heading>
      <div
        className="grid grid-cols-1 gap-4 mt-4"
      >
        {
          events.slice(0, 3).map((data) => (
            <EventsCard
              key={data.id}
              event={data}
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
  totalEventsWithCats,
  selectedCategory,
  t
}: {
  categories: Content.EventsCategoryDocument[],
  totalEventsWithCats: Content.EventpageDocumentDataCategoriesItem[],
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
              count={totalEventsWithCats.filter(cat => (cat.categorie as any).id === data.id).length}
              name={data.data.name as string}
              isSelected={selectedCategory === data.id}
            />
          ))
        }
      </div>
    </div>
  )
}

export default EventsList;
