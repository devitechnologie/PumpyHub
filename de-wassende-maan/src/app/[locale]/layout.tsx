import type { Metadata } from "next"

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'react-tooltip/dist/react-tooltip.css'
import 'react-toastify/dist/ReactToastify.css'

import "@/styles/globals.css"
import { createClient } from "@/prismicio"
import RootPageWrapper from "@/components/wrappers/RootPageWrapper"
import {getFont} from "@/utils/fonts"

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient()
  const settings = await client.getSingle("settings")

  return {
    title: settings.data.site_title || "Placeholder Title",
    description: settings.data.meta_description || "Placeholder Description",
    openGraph: {
      images: [settings.data.og_image.url || ""],
    },
    icons: [
      settings.data.favicon.url || "/favicon.ico",
    ]
  }
}

export default async function RootLayout(
  { children, params: { locale } }
    : Readonly<{ children: React.ReactNode, params: { locale: string } }>
) {
  const client = createClient()
  const settings = await client.getSingle("settings")
  const font = getFont(settings.data.fontfamily)

  return (
    <html lang={locale}>
      <body
        className={font.className}
      >
        <RootPageWrapper
          locale={locale}
        >
          {children}
        </RootPageWrapper>
      </body>
    </html>
  )
}
