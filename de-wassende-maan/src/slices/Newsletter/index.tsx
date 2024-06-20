import NewsletterForm from "@/components/forms/NewsletterForm";
import Heading from "@/components/ui/Heading";
import Bounded from "@/components/wrappers/Bounded";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Newsletter`.
 */
export type NewsletterProps = SliceComponentProps<Content.NewsletterSlice>;

/**
 * Component for "Newsletter" Slices.
 */
const Newsletter = ({ slice }: NewsletterProps): JSX.Element => {

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="section-py"
    >
      <div
        className="relative text-center py-10 md:py-[50px] px-8 rounded-3xl space-y-4 z-0 bg-newsletter bg-no-repeat"
      >
        <Heading
          as="h2"
          variant="h1"
          className="max-w-[500px] mx-auto capitalize text-heading-secondary"
        >
          {slice.primary.heading}
        </Heading>
        <PrismicRichText
          field={slice.primary.description}
          components={{
            paragraph: ({ children }) => (
              <p
                className="text-lg leading-relaxed mb-4 max-w-[500px] mx-auto text-heading-secondary"
              >
                {children}
              </p>
            ),
          }}
        />
        <div className="relative max-w-[500px] mx-auto">
          <NewsletterForm
            placeholderText={slice.primary.placeholder_text || ""}
            buttonText={slice.primary.button_text || ""}
          />
        </div>
      </div>
    </Bounded>
  );
};

export default Newsletter;
