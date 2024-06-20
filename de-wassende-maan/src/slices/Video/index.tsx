import Heading from "@/components/ui/Heading";
import Bounded from "@/components/wrappers/Bounded";
import { createClient } from "@/prismicio";
import { cn } from "@/utils/cn";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Link from "next/link";

/**
 * Props for `Video`.
 */
export type VideoProps = SliceComponentProps<Content.VideoSlice, { lang?: string }>;

/**
 * Component for "Video" Slices.
 */
const Video = async ({ slice, context }: VideoProps): Promise<JSX.Element> => {
  const client = createClient()
  const settings = await client.getSingle("settings", { lang: context.lang })
  let html = slice.primary.video.html
  html = html && html.replace(/width="[^"]*"/, 'width="100%"')
  html = html && html.replace(/height="[^"]*"/, 'height="100%"')

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="section-py overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center"
    >
      <div
        style={{
          borderRadius: settings?.data.images_raduis || 20,
        }}
        className={
          cn(
            "relative w-full h-full aspect-video md:aspect-auto md:h-96 overflow-hidden",
            slice.variation === "videoRight" && "md:order-2"
          )
        }
      >
        {
          html && (
            <div
              className="w-full h-full"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          )
        }
      </div>
      <div>
        <PrismicRichText
          field={slice.primary.heading}
          components={{
            heading1: ({ children }) => (
              <Heading
                as="h2"
                variant="h2"
                className="text-heading-secondary mb-4"
              >
                {children}
              </Heading>
            )
          }}
        />
        <PrismicRichText
          field={slice.primary.body}
          components={{
            paragraph: ({ children }) => (
              <p
                className="text-lg text-gray-600 leading-relaxed mb-4"
              >
                {children}
              </p>
            ),
            hyperlink: ({ children, node }) => {
              return (
                <Link
                  href={node.data.url || "#"}
                  className="text-link-hover-2 hover:underline"
                >
                  {children}
                </Link>
              );
            }
          }}
        />
      </div>
    </Bounded>
  );
};

export default Video;
