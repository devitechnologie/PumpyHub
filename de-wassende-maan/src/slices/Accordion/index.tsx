import FAQListView from "@/components/FAQListView";
import Heading from "@/components/ui/Heading";
import Bounded from "@/components/wrappers/Bounded";

import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Accordion`.
 */
export type FaqProps = SliceComponentProps<Content.FaqSlice, { lang?: string }>

/**
 * Component for "Accordion" Slices.
 */
const Accordion = ({ slice }: FaqProps): JSX.Element => {

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="section-py min-h-[50vh]"
    >
      <PrismicRichText
        field={slice.primary.title}
        components={{
          heading2: ({ children }) => (
            <Heading
              as="h2"
              variant="h1"
              className="mb-8 md:mb-12 text-center text-primary-green-dark-dwm capitalize"
            >
              {children}
            </Heading>
          )
        }}
      />
      <div
        className="flex flex-col md:flex-row gap-8 items-start w-full"
      >
        <FaqContent
          faqItems={slice.items}
        />
      </div>
    </Bounded>
  );
};

const FaqContent = ({ faqItems }: { faqItems: Content.FaqSliceDefaultItem[] }) => {
  return (
    <div className="w-full">
      <FAQListView
        faqItems={
          faqItems.map((item) => {
            return {
              question: item.accordion_heading,
              answer: item.accordion_body
            }
          })
        }
      />
    </div>
  )
}

export default Accordion;
