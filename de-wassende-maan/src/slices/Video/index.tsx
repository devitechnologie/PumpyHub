import Heading from "@/components/ui/Heading";
import Bounded from "@/components/wrappers/Bounded";
import { cn } from "@/utils/cn";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Link from "next/link";

/**
 * Props for `Video`.
 */
export type VideoProps = SliceComponentProps<Content.VideoSlice>;

/**
 * Component for "Video" Slices.
 */
const Video = ({ slice }: VideoProps): JSX.Element => {
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
        className={
          cn(
            "relative w-full h-full aspect-video md:aspect-auto md:h-96 rounded-2xl overflow-hidden",
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
                className="text-primary-green-dark-dwm mb-4"
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
                  className="text-primary-green hover:underline"
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
