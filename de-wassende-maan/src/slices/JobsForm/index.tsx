import PostJobForm from "@/components/forms/PostJobForm";
import Heading from "@/components/ui/Heading";
import Bounded from "@/components/wrappers/Bounded";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";

const components: JSXMapSerializer = {
  heading2: ({ children }) => (
    <Heading
      as="h2"
      variant="h1"
      className="mb-4 text-primary-green-dark-dwm text-center"
    >
      {children}
    </Heading>
  ),
}

/**
 * Props for `JobsForm`.
 */
export type JobsFormProps = SliceComponentProps<Content.JobsFormSlice, { uid: string }>;

/**
 * Component for "JobsForm" Slices.
 */
const JobsForm = ({ slice, context }: JobsFormProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="section-py"
    >
      <div
        className="w-full max-w-3xl mx-auto"
      >
        <PrismicRichText
          field={slice.primary.heading}
          components={components}
        />
        <div className="mt-16">
          <PostJobForm 
            jobUID={context.uid}
            reply_to={slice.primary.reply_to}
            cc={slice.items.map((item) => item.email_cc).join(', ')}
          />
        </div>
      </div>
    </Bounded>
  );
};

export default JobsForm;
