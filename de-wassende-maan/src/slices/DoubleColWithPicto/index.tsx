import Divider from "@/components/ui/Divider";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import Bounded from "@/components/wrappers/Bounded";

import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Image from "next/image";

const Photos = {
  instructions: "/images/instructions.jpg",
  ingredients: "/images/ingredients.jpg",
};

const components: JSXMapSerializer = {
  heading1: ({ children }) => (
    <Heading
      as="h1"
      variant="h2"
      className="font-extrabold md:mb-4 mb-2 mt-8"
    >
      {children}
    </Heading>
  ),
  heading2: ({ children }) => (
    <Heading
      as="h2"
      variant="h2"
      className="md:mb-4 mb-2 mt-8 text-heading-secondary"
    >
      {children}
    </Heading>
  ),
  heading3: ({ children }) => (
    <Heading
      as="h3"
      variant="h4"
      className="md:mb-2 mb-2 mt-4 text-heading-secondary"
    >
      {children}
    </Heading>
  ),
  heading4: ({ children }) => (
    <Heading
      as="h4"
      variant="h5"
      className="md:mb-2 mb-2 mt-4 text-heading-secondary"
    >
      {children}
    </Heading>
  ),
  heading5: ({ children }) => (
    <Heading
      as="h5"
      variant="h6"
      className="md:mb-2 mb-2 mt-4 text-heading-secondary"
    >
      {children}
    </Heading>
  ),
  heading6: ({ children }) => (
    <Heading
      as="h6"
      variant="h6"
      className="md:mb-2 mb-2 mt-4 text-heading-secondary"
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
  },
}

/**
 * Props for `DoubleColWithPicto`.
 */
export type DoubleColWithPictoProps =
  SliceComponentProps<Content.SliceDoubleColWithPictoSlice>;

/**
 * Component for "DoubleColWithPicto" Slices.
 */
const DoubleColWithPicto = async ({ slice }: DoubleColWithPictoProps): Promise<JSX.Element> => {

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="section-py"
    >
      {
        slice.primary.heading.length > 0 && (
          <div
            className="flex justify-center items-center mb-8"
          >
            <PrismicRichText
              field={slice.primary.heading}
              components={{
                heading2: ({ children }) => (
                  <Heading
                    as="h2"
                    variant="h1"
                    className="mb-8 md:mb-12 text-center text-heading-secondary capitalize"
                  >
                    {children}
                  </Heading>
                ),
              }}
            />
          </div>
        )
      }
      <div className="flex gap-8 w-full md:flex-row flex-col">
        <div className="flex-1">
          <div
            className="flex gap-6 items-center mb-4"
          >
            <Image
              src={Photos[slice.primary.picto_1]}
              alt={slice.primary.picto_1}
              width={100}
              height={100}
              className="w-20 h-20"
            />
            <PrismicRichText
              field={slice.primary.heading_col_1}
              components={components}
            />
          </div>
          <div
            className={`prose`}
          >
            <PrismicRichText
              field={slice.primary.body_1}
              components={components}
            />
          </div>
        </div>
        <div className="hidden md:block">
          <Divider vertical />
        </div>
        <div className="flex-1">
          <div
            className="flex gap-6 items-center mb-4"
          >
            <Image
              src={Photos[slice.primary.picto_2]}
              alt={slice.primary.picto_2}
              width={100}
              height={100}
              className="w-20 h-20"
            />
            <PrismicRichText
              field={slice.primary.heading_col_2}
              components={components}
            />
          </div>
          <div className={`prose`}>
            <PrismicRichText
              field={slice.primary.body_2}
              components={components}
            />
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default DoubleColWithPicto;
