import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import Bounded from "@/components/wrappers/Bounded";
import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `FreeTxt`.
 */
export type FreeTxtProps = SliceComponentProps<Content.FreeTxtSlice>;

const headingComponents: JSXMapSerializer = {
  heading1: ({ children }) => (
    <Heading
      as="h1"
      variant="h2"
      className="font-extrabold md:mb-4 mb-2"
    >
      {children}
    </Heading>
  ),
  heading2: ({ children }) => (
    <Heading
      as="h2"
      variant="h3"
      className="md:mb-4 mb-2 text-heading-secondary"
    >
      {children}
    </Heading>
  ),
  heading3: ({ children }) => (
    <Heading
      as="h3"
      variant="h4"
      className="md:mb-2 mb-2 text-heading-secondary"
    >
      {children}
    </Heading>
  ),
  heading4: ({ children }) => (
    <Heading
      as="h4"
      variant="h5"
      className="md:mb-2 mb-2 text-heading-secondary"
    >
      {children}
    </Heading>
  ),
  heading5: ({ children }) => (
    <Heading
      as="h5"
      variant="h6"
      className="md:mb-2 mb-2 text-heading-secondary"
    >
      {children}
    </Heading>
  ),
}

const components: JSXMapSerializer = {
  heading1: ({ children }) => (
    <Heading
      as="h1"
      variant="h2"
      className="font-extrabold"
    >
      {children}
    </Heading>
  ),
  heading2: ({ children }) => (
    <Heading
      as="h2"
      variant="h3"
      className="text-heading-secondary"
    >
      {children}
    </Heading>
  ),
  heading3: ({ children }) => (
    <Heading
      as="h3"
      variant="h4"
      className="text-heading-secondary"
    >
      {children}
    </Heading>
  ),
  heading4: ({ children }) => (
    <Heading
      as="h4"
      variant="h5"
      className="text-heading-secondary"
    >
      {children}
    </Heading>
  ),
  heading5: ({ children }) => (
    <Heading
      as="h5"
      variant="h6"
      className="text-heading-secondary"
    >
      {children}
    </Heading>
  ),
  heading6: ({ children }) => (
    <Heading
      as="h6"
      variant="h6"
      className="text-heading-secondary"
    >
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => (
    <Paragraph
      className="text-primary-black"
    >
      {children}
    </Paragraph>
  ),
  hyperlink: ({ children, node }) => {
    return (
      <PrismicNextLink
        field={node.data}
        className="text-primary hover:underline"
      >
        {children}
      </PrismicNextLink>
    );
  }
}

/**
 * Component for "FreeTxt" Slices.
 */
const FreeTxt = ({ slice }: FreeTxtProps): JSX.Element => {
  return (
    <>
      {
        slice.variation === "default" && (
          <Bounded
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
            className="section-py-xs"
          >
            <PrismicRichText
              field={slice.primary.heading}
              components={headingComponents}
            />


            <div className="prose !max-w-full">
              <PrismicRichText
                field={slice.primary.body}
                components={components}
              />
            </div>
          </Bounded>
        )
      }

      {
        slice.variation === "2Column" && (
          <Bounded
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
            className="section-py-xs"
          >
            <PrismicRichText
              field={slice.primary.heading}
              components={headingComponents}
            />

            <div className="xl:gap-20 lg:gap-10 md:columns-2 gap-5 prose !max-w-full">
              <PrismicRichText
                field={slice.primary.body}
                components={components}
              />
            </div>
          </Bounded>
        )
      }

      {
        slice.variation === "3Column" && (
          <Bounded
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
            className="section-py-xs"
          >
            <PrismicRichText
              field={slice.primary.heading}
              components={headingComponents}
            />

            <div className="xl:gap-20 lg:gap-10 md:columns-3 gap-5 prose !max-w-full">
              <PrismicRichText
                field={slice.primary.body}
                components={components}
              />
            </div>
          </Bounded>
        )
      }
    </>
  );
};

export default FreeTxt;
