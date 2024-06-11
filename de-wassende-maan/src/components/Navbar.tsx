import { FaFacebookF, FaInstagram } from "react-icons/fa"

import Bounded from "@/components/wrappers/Bounded"
import LangMenu from "./LangMenu"
import { createClient } from "@/prismicio"
import { PrismicRichText } from "@prismicio/react"
import { PrismicNextLink } from "@prismicio/next"
import HeaderNav from "./HeaderNav"
import { getLongLocale } from "@/utils/helpers"
import Link from "next/link"
import initTranslations from "@/app/i18n"

const Navbar = async ({ locale }: { locale: string }) => {
  const client = createClient()
  const navigation = await client.getSingle("navigation", {
    lang: getLongLocale(locale)
  })

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 bg-white"
    >
      {/* TopBar */}
      <TopBar
        lang={locale}
      />
      {/* header Navbar */}
      <HeaderNav
        data={navigation}
      />
    </header>
  )
}

const TopBar = async ({ lang }: { lang: string }) => {
  const { t } = await initTranslations(lang, ['*'], null, null)
  const client = createClient()
  const topBar = await client.getSingle("top_bar", { lang: getLongLocale(lang) })

  return (
    <div
      style={{
        backgroundColor: topBar.data.background_color || "#48b170"
      }}
      className="py-1 md:py-2 text-white"
    >
      <Bounded
        className="flex items-center justify-center md:justify-between relative"
      >
        {/* language menu switcher */}
        <div
          className="hidden md:flex items-center gap-4"
        >
          <LangMenu />
        </div>
        <div
          className="xl:absolute xl:top-1/2 xl:left-1/2 xl:transform xl:-translate-x-1/2 xl:-translate-y-1/2"
        >
          <PrismicRichText
            field={topBar.data.center_title}
            components={{
              paragraph: ({ children }) => (
                <p className="text-center font-semibold uppercase text-sm tracking-widest line-clamp-1">
                  {children}
                </p>
              )
            }}
          />
        </div>
        <div
          className="md:flex items-center gap-4 hidden"
        >
          <PrismicNextLink
            target="_blank"
            field={topBar.data.facebook_link}
          >
            <FaFacebookF />
          </PrismicNextLink>

          <PrismicNextLink
            target="_blank"
            field={topBar.data.instagram_link}
          >
            <FaInstagram />
          </PrismicNextLink>
          <Link
            href="/contact"
            className="flex items-center gap-2 cursor-pointer text-white py-0 px-0 hover:underline uppercase font-semibold text-sm tracking-widest"
          >
            <span>
              {t("contact_us")}
            </span>
          </Link>
        </div>
      </Bounded>
    </div>
  )
}

export default Navbar