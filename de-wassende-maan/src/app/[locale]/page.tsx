import { Metadata } from "next"
import { SliceZone } from "@prismicio/react"

import { createClient } from "@/prismicio"
import { getLongLocale } from "@/utils/helpers"
import { components } from "@/slices"

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const client = createClient()
  const page = await client.getSingle("homepage", {
    lang: getLongLocale(locale),
  })

  return (
    <SliceZone
      slices={page.data.slices}
      components={components}
      context={{ lang: getLongLocale(locale) }}
    />
  )
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const client = createClient()
  const page = await client.getSingle("homepage", {
    lang: getLongLocale(locale),
  })

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  }
}