import { NextRequest, NextResponse } from 'next/server'

import { createClient } from '@/prismicio'
import { getLongLocale } from '@/utils/helpers'

export const GET = async (request: NextRequest) => {
  const lang = request.nextUrl.searchParams.get('lang') || 'en-us'
  const client = createClient()
  const navigation = await client.getSingle("navigation", {
    lang: getLongLocale(lang)
  })
  const footer = await client.getSingle("navigation_footer", {
    lang: getLongLocale(lang)
  })

  return NextResponse.json({
    status: 'success',
    navigation: navigation.data.slices,
    footer: footer.data
  },
    {
      status: 200
    }
  )
}