import { FaFacebookF, FaInstagram } from "react-icons/fa6"
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next"
import Image from "next/image"
import { JSXMapSerializer, PrismicRichText } from "@prismicio/react"
import Link from "next/link"

import initTranslations from "@/app/i18n"
import { createClient } from "@/prismicio"
import { getLongLocale } from "@/utils/helpers"
import Paragraph from "./ui/Paragraph"
import NewsletterForm from "./forms/NewsletterForm"

const components: JSXMapSerializer = {
  paragraph: ({ children }) => (
    <Paragraph
      className="mb-4 text-sm text-primary-green-dark-dwm"
    >
      {children}
    </Paragraph>
  ),
  hyperlink: ({ children, node }) => (
    <PrismicNextLink
      field={node.data}
      className="text-primary-green-dark-dwm hover:underline cursor-pointer hover:text-primary-green transition-colors duration-300"
    >
      {children}
    </PrismicNextLink>
  )
}

type FooterProps = {
  locale: string
}

const Footer = async ({ locale }: FooterProps) => {
  const client = createClient()
  const footerNav = await client.getSingle("navigation_footer", { lang: getLongLocale(locale) })
  const { t } = await initTranslations(locale, ['*'], null, null)

  return (
    <footer className="bg-primary-surface">
      <div className={`app-container pt-8 lg:pt-16`}>
        <div>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-14 lg:grid-cols-11"
          >
            <div className="flex-1 min-w-[140px] md:col-span-2">
              <Link
                href="/"
                className="block w-48"
              >
                <PrismicNextImage
                  field={footerNav.data.brand_logo}
                  className="object-contain w-full h-full"
                  width={800}
                  height={800}
                />
              </Link>
            </div>
            <div className="md:col-span-2">
              <h2 className="mb-4 text-sm font-bold text-primary-green-dark-dwm uppercase">
                {t("informations")}
              </h2>
              <ul className="font-medium text-sm text-primary-black">
                {
                  footerNav.data.informations.length > 0 && (
                    footerNav.data.informations.map((item, i) => (
                      <li
                        className='mb-4'
                        key={i}
                      >
                        <PrismicNextLink
                          field={item.link}
                          className="flex flex-col justify-center items-start relative w-fit"
                        >
                          <span
                            className="text-sm capitalize font-medium cursor-pointer peer"
                          >
                            {item.text}
                          </span>
                          {/* line */}
                          <div
                            className="w-0 peer-hover:w-full transition-all rounded-full duration-300 h-[1px] bg-primary-green"
                          />
                        </PrismicNextLink>
                      </li>
                    ))
                  )
                }
              </ul>
            </div>

            <div className="md:col-span-2">
              <h2 className="mb-4 text-sm font-bold text-primary-green-dark-dwm uppercase">
                {t("liens_rapides")}
              </h2>
              <ul className="font-medium text-sm text-primary-black">
                {
                  footerNav.data.liens_rapides.length > 0 && (
                    footerNav.data.liens_rapides.map((item, i) => (
                      <li
                        className='mb-4'
                        key={i}
                      >
                        <PrismicNextLink
                          field={item.link}
                          className="flex flex-col justify-center items-start relative w-fit"
                        >
                          <span
                            className="text-sm capitalize font-medium cursor-pointer peer"
                          >
                            {item.text}
                          </span>
                          {/* line */}
                          <div
                            className="w-0 peer-hover:w-full transition-all rounded-full duration-300 h-[1px] bg-primary-green"
                          />
                        </PrismicNextLink>
                      </li>
                    ))
                  )
                }
              </ul>
            </div>

            <div className="md:col-span-2">
              <h2 className="mb-4 text-sm font-bold text-primary-green-dark-dwm uppercase">
                {t("service_client")}
              </h2>
              <ul className="font-medium text-sm text-primary-black">
                {
                  footerNav.data.service_client.length > 0 && (
                    footerNav.data.service_client.map((item, i) => (
                      <li
                        className='mb-4'
                        key={i}
                      >
                        <PrismicNextLink
                          field={item.link}
                          className="flex flex-col justify-center items-start relative w-fit"
                        >
                          <span
                            className="text-sm capitalize font-medium cursor-pointer peer"
                          >
                            {item.text}
                          </span>
                          {/* line */}
                          <div
                            className="w-0 peer-hover:w-full transition-all rounded-full duration-300 h-[1px] bg-primary-green"
                          />
                        </PrismicNextLink>
                      </li>
                    ))
                  )
                }
              </ul>
            </div>

            <div className="md:col-span-3">
              <h2 className="mb-4 text-sm font-bold text-primary-green-dark-dwm uppercase">
                {t("newsletter")}
              </h2>
              <Paragraph>
                {t("newsletter_text")}
              </Paragraph>
              <div className="mt-4">
                <NewsletterForm
                  buttonText={t("newsletter")}
                  placeholderText="Votre adresse email"
                  footerVariant
                />
              </div>
              <div className="mt-4">
                <div
                  className='flex items-center gap-4 text-lg'
                >
                  <PrismicNextLink
                    target="_blank"
                    field={footerNav.data.facebook_link}
                    className="text-gray-700 hover:text-gray-900 dark:hover:text-white"
                  >
                    <FaFacebookF />
                  </PrismicNextLink>

                  <PrismicNextLink
                    target="_blank"
                    field={footerNav.data.instagram_link}
                    className="text-gray-700 hover:text-gray-900 dark:hover:text-white"
                  >
                    <FaInstagram
                    />
                  </PrismicNextLink>
                </div>
              </div>
            </div>

            <div className="md:col-span-3">
              <PrismicRichText
                field={footerNav.data.address_col_1}
                components={components}
              />
            </div>
            <div className="md:col-span-3">
              <PrismicRichText
                field={footerNav.data.address_col_2}
                components={components}
              />
            </div>
            <div className="md:col-span-2">
              <PrismicRichText
                field={footerNav.data.address_col_3}
                components={components}
              />
            </div>
            <div className="md:col-span-3">
              <div
                className="w-[250px]"
              >
                <PrismicNextImage
                  field={footerNav.data.label}
                  className="object-contain w-full h-full"
                  width={800}
                  height={400}
                />
              </div>
            </div>
          </div>
        </div>
        <hr className="my-4 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between pb-4 lg:pb-8">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            Copyright © {" "}
            {
              new Date().getFullYear()
            }{" "} by {" "}
            <Link
              href='#'
              target='_blank'
              className="hover:underline text-primary-blue-700"
            >
              De Wassende Maan
            </Link>.
            Tous droits réservés.
          </span>
          <div className="mt-4 sm:mt-0 flex gap-4">
            <Paragraph
              className="text-sm text-gray-500 dark:text-gray-400"
            >
              Payment methods
            </Paragraph>
            <div
              className="flex gap-2 items-center"
            >
              <div
                className="w-[36px]"
              >
                <Image
                  src="https://projectdwm.vercel.app/_next/image?url=%2Fimages%2Fpayment%2F150x96.png&w=640&q=75"
                  alt="Payment Methods"
                  width={200}
                  height={200}
                />
              </div>
              <div
                className="w-[36px]"
              >
                <Image
                  src="https://projectdwm.vercel.app/_next/image?url=%2Fimages%2Fpayment%2F150x96.png&w=640&q=75"
                  alt="Payment Methods"
                  width={200}
                  height={200}
                />
              </div>
              <div
                className="w-[36px]"
              >
                <Image
                  src="https://projectdwm.vercel.app/_next/image?url=%2Fimages%2Fpayment%2F150x96.png&w=640&q=75"
                  alt="Payment Methods"
                  width={200}
                  height={200}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer