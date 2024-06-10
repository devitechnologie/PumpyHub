import Heading from "@/components/ui/Heading";
import Bounded from "@/components/wrappers/Bounded";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import Badge from "@/components/ui/Badge";
import Paragraph from "@/components/ui/Paragraph";

/**
 * Props for `ColsWithImageText`.
 */
export type ColsWithImageTextProps =
  SliceComponentProps<Content.ColsWithImageTextSlice>;

/**
 * Component for "ColsWithImageText" Slices.
 */
const ColsWithImageText = ({ slice }: ColsWithImageTextProps): JSX.Element => {
  return (
    <>
      {
        slice.variation === "default" && (
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
              <PrismicRichText
                field={slice.primary.heading}
                components={{
                  heading2: ({ children }) => (
                    <Heading
                      as="h2"
                      variant="h1"
                      className="mb-8 md:mb-12 text-center text-primary-green-dark-dwm capitalize"
                    >
                      {children}
                    </Heading>
                  ),
                }}
              />
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
              >
                <ColsWithImageTextCard
                  image={slice.primary.image_col_1}
                  title={slice.primary.heading_col_1}
                  body={slice.primary.body_col_1}
                  badge={slice.primary.badge_col_1}
                />

                <ColsWithImageTextCard
                  image={slice.primary.image_col_2}
                  title={slice.primary.heading_col_2}
                  body={slice.primary.body_col_2}
                  badge={slice.primary.badge_col_2}
                />

                <ColsWithImageTextCard
                  image={slice.primary.image_col_3}
                  title={slice.primary.heading_col_3}
                  body={slice.primary.body_col_3}
                  badge={slice.primary.badge_col_3}
                />

              </div>
            </Bounded>
          </div>
        )
      }
      {
        slice.variation === "4Columns" && (
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
              <PrismicRichText
                field={slice.primary.heading}
                components={{
                  heading2: ({ children }) => (
                    <Heading
                      as="h2"
                      variant="h1"
                      className="mb-8 md:mb-12 text-center text-primary-green-dark-dwm capitalize"
                    >
                      {children}
                    </Heading>
                  ),
                }}
              />
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8"
              >
                <ColsWithImageTextCard
                  image={slice.primary.image_col_1}
                  title={slice.primary.heading_col_1}
                  body={slice.primary.body_col_1}
                  badge={slice.primary.badge_col_1}
                />

                <ColsWithImageTextCard
                  image={slice.primary.image_col_2}
                  title={slice.primary.heading_col_2}
                  body={slice.primary.body_col_2}
                  badge={slice.primary.badge_col_2}
                />

                <ColsWithImageTextCard
                  image={slice.primary.image_col_3}
                  title={slice.primary.heading_col_3}
                  body={slice.primary.body_col_3}
                  badge={slice.primary.badge_col_3}
                />

                <ColsWithImageTextCard
                  image={slice.primary.image_col_4}
                  title={slice.primary.heading_col_4}
                  body={slice.primary.body_col_4}
                  badge={slice.primary.badge_col_4}
                />

              </div>
            </Bounded>
          </div>
        )
      }
    </>
  );
};

const ColsWithImageTextCard = ({ image, title, body, badge }: any) => {
  return (
    <div
      className="block group space-y-4"
    >
      <div
        className="aspect-[3/2] rounded-[20px] overflow-hidden"
      >
        <PrismicNextImage
          field={image}
          width={800}
          height={533}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="space-y-2">
        <Badge
          variant="primary"
          className="w-fit uppercase font-semibold py-1"
        >
          {
            badge
          }
        </Badge>
        <PrismicRichText
          field={title}
          components={{
            heading3: ({ children }) => (
              <Heading
                as="h4"
                variant="h3"
                className="font-semibold group-hover:underline cursor-pointer line-clamp-2"
              >
                {children}
              </Heading>
            ),
          }}
        />
        <PrismicRichText
          field={body}
          components={{
            paragraph: ({ children }) => (
              <Paragraph className="line-clamp-3">
                {children}
              </Paragraph>
            ),
          }}
        />
        {/* <Paragraph size="sm" className="capitalize">
          - {format(jobs.first_publication_date, "MMMM dd, yyyy", { locale: lang === 'fr' ? fr : lang === 'nl' ? nl : enUS })}
        </Paragraph> */}
      </div>
    </div>
  )
}

export default ColsWithImageText;
