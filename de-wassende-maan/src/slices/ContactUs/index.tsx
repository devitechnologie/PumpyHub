import { Content } from "@prismicio/client"
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react"

import { createClient } from "@/prismicio"
import { getLongLocale } from "@/utils/helpers"
import Bounded from "@/components/wrappers/Bounded"
import ContactForm from "@/components/forms/ContactForm"
import Paragraph from "@/components/ui/Paragraph"
import { PrismicNextLink } from "@prismicio/next"

const components: JSXMapSerializer = {
  paragraph: ({ children }) => (
    <Paragraph
      className="mb-4 text-primary-dark"
    >
      {children}
    </Paragraph>
  ),
  hyperlink: ({ children, node }) => (
    <PrismicNextLink
      field={node.data}
      className="text-primary-dark hover:underline cursor-pointer hover:text-primary transition-colors duration-300"
    >
      {children}
    </PrismicNextLink>
  )
}

/**
 * Props for `ContactUs`.
 */
export type ContactUsProps = SliceComponentProps<Content.ContactUsSlice, { lang?: string }>

/**
 * Component for "ContactUs" Slices.
 */
const ContactUs = ({ slice, context }: ContactUsProps): JSX.Element => {

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="section-py"
    >
      <div
        className="flex flex-col flex-wrap md:flex-row gap-8 lg:gap-16"
      >
        <div className="flex-1">
          <ContactForm
            reply_to={slice.primary.reply_to}
            cc={slice.items.map((item) => item.emails_cc).join(', ')}
          />
        </div>
        <ContactAside
          locale={context.lang}
        />
      </div>
    </Bounded>
  )
}

const ContactAside = async ({ locale }: { locale?: string }): Promise<JSX.Element> => {
  const client = createClient()
  const footerNav = await client.getSingle("navigation_footer", { lang: getLongLocale(locale || '') })

  return (
    <div
      className="md:min-w-[300px] lg:min-w-[400px] max-w-[400px] lg:p-6 space-y-8"
    >
      <div>
        <PrismicRichText
          field={footerNav.data.address_col_1}
          components={components}
        />
      </div>
      <div>
        <PrismicRichText
          field={footerNav.data.address_col_2}
          components={components}
        />
      </div>
      <div>
        <PrismicRichText
          field={footerNav.data.address_col_3}
          components={components}
        />
      </div>
    </div>
  )
}

export default ContactUs
