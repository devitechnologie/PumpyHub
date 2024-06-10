import Heading from "@/components/ui/Heading"
import Paragraph from "@/components/ui/Paragraph"
import Bounded from "@/components/wrappers/Bounded"
import { Content, isFilled } from "@prismicio/client"
import { SliceComponentProps } from "@prismicio/react"
import TestimonialsList from "./TestimonialsList"
import { createClient } from "@/prismicio"
import { TestimonialDocument } from "../../../prismicio-types"

/**
 * Props for `Testimonials`.
 */
export type TestimonialsProps = SliceComponentProps<Content.TestimonialsSlice, { lang?: string }>

/**
 * Component for "Testimonials" Slices.
 */
const Testimonials = async ({ slice, context }: TestimonialsProps): Promise<JSX.Element> => {
  const client = createClient()
  const testimonials = await Promise.all(
    slice.items.map((item) => {
      if (isFilled.contentRelationship(item.testimonials)) {
        return client.getByID(item.testimonials.id, { lang: context.lang })
      }
    })
  )

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="section-py"
    >
      <Bounded
        as="div"
        className="space-y-2 text-center"
      >
        <Heading
          as="h2"
          variant="h1"
          className="text-primary-green-dark-dwm capitalize"
        >
          {slice.primary.heading}
        </Heading>
        <Paragraph size="lg">
          {slice.primary.text}
        </Paragraph>
      </Bounded>

      {testimonials && (
        <TestimonialsList
          testimonials={testimonials as TestimonialDocument[]}
        />
      )}
    </section>
  )
}

export default Testimonials
