import JobsCard from "@/components/JobsCard";
import Heading from "@/components/ui/Heading";
import Bounded from "@/components/wrappers/Bounded";
import { createClient } from "@/prismicio";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `LatestJobs`.
 */
export type LatestJobsProps = SliceComponentProps<Content.LatestJobsSlice, { lang?: string }>;

/**
 * Component for "LatestJobs" Slices.
 */
const LatestJobs = async ({ slice, context }: LatestJobsProps): Promise<JSX.Element> => {
  const client = createClient()
  const settings = await client.getSingle("settings", { lang: context.lang })
  const jobs = await client.getAllByType("jobspage",
    {
      limit: 3,
      lang: context.lang,
      orderings: {
        field: 'document.publication_date',
        direction: 'desc'
      }
    }
  )

  return (
    <div
      style={{
        backgroundColor: slice.primary.background_color || '#FFFFFF'
      }}
    >
      <Bounded
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="section-py"
      >
        <Heading
          as="h2"
          variant="h1"
          className="mb-8 md:mb-12 text-center text-primary-green-dark-dwm capitalize"
        >
          {slice.primary.heading}
        </Heading>
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
        >
          {
            jobs.map((data) => (
              <JobsCard
                key={data.id}
                jobs={data}
                isLatest
                borderRadius={settings.data.images_raduis || undefined}
              />
            ))
          }
        </div>
      </Bounded>
    </div>
  );
};

export default LatestJobs;
