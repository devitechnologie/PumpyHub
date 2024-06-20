import NewsCard from "@/components/NewsCard";
import Heading from "@/components/ui/Heading";
import Bounded from "@/components/wrappers/Bounded";
import { createClient } from "@/prismicio";

import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { NewspageDocument } from "../../../prismicio-types";
import RecipesCard from "@/components/RecipesCard";
import JobsCard from "@/components/JobsCard";
import EventsCard from "@/components/EventsCard";

/**
 * Props for `TopOfNews`.
 */
export type TopOfNewsProps = SliceComponentProps<Content.TopOfNewsSlice, { lang?: string }>;
/**
 * Component for "TopOfNews" Slices.
 */
const TopOfNews = async ({ slice, context }: TopOfNewsProps): Promise<JSX.Element> => {
  const client = createClient();
  const settings = await client.getSingle("settings", { lang: context.lang })
  // content relationship field
  const data = await Promise.all(
    slice.items.map((item) => {
      if (isFilled.contentRelationship(item.content)) {
        return client.getByID(item.content.id, { lang: context.lang });
      }
    })
  );

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="section-py"
    >
      <Heading
        as="h2"
        variant="h1"
        className="mb-8 md:mb-12 text-center text-heading-secondary capitalize"
      >
        {slice.primary.heading}
      </Heading>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
      >
        {
          data.map((data) => {
            if (data && data.type === "newspage") {
              return (
                <NewsCard
                  key={data.id}
                  news={data}
                  borderRadius={settings.data.images_raduis || undefined}
                />
              )
            } else if (data && data.type === "recipespage") {
              return (
                <RecipesCard
                  key={data.id}
                  recipes={data}
                  borderRadius={settings.data.images_raduis || undefined}
                />
              )
            } else if (data && data.type === "jobspage") {
              return (
                <JobsCard
                  key={data.id}
                  jobs={data}
                  borderRadius={settings.data.images_raduis || undefined}
                />
              )
            } else if (data && data.type === "eventpage") {
              return (
                <EventsCard
                  key={data.id}
                  event={data}
                  borderRadius={settings.data.images_raduis || undefined}
                />
              )
            }
          })
        }
      </div>
    </Bounded>
  );
};

export default TopOfNews;
