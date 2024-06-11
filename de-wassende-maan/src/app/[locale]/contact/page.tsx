import { Metadata } from "next"
import { SliceZone } from "@prismicio/react"

import { createClient } from "@/prismicio"
import { components } from "@/slices"
import { getLongLocale } from "@/utils/helpers"

type PageProps = {
  params: Params
}

type Params = { locale: string }

export default async function Contact({ params: { locale } }: PageProps) {
  const client = createClient()
  const page = await client.getSingle("contactpage", { lang: getLongLocale(locale) })

  return (
    <SliceZone
      slices={page.data.slices}
      components={components}
      context={{ lang: getLongLocale(locale) }}
    />
  )
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient()
  const page = await client.getSingle("contactpage", { lang: getLongLocale(params.locale) })

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  }
}
