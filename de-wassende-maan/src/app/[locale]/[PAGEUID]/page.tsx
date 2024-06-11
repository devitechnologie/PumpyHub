import { Metadata } from "next";
import { redirect } from "next/navigation";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { getLongLocale } from "@/utils/helpers";
import { getPageDocType } from "@/utils/routesData";

type PageProps = {
  params: Params;
  searchParams: URLSearchParams;
};

type Params = { PAGEUID: string, locale: string, UID: string };

export default async function Page({ params: { locale, PAGEUID }, searchParams }: PageProps) {
  let typeToFetch = getPageDocType(PAGEUID)

  if (!typeToFetch) {
    redirect("/404")
  }

  const client = createClient();
  const page = await client
    .getSingle(typeToFetch as any, { lang: getLongLocale(locale) })
    .catch(() => redirect("/404"));

  return (
    <SliceZone
      slices={(page.data as any).slices}
      components={components}
      context={{ lang: getLongLocale(locale), searchParams }}
    />
  )
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {

  let typeToFetch = getPageDocType(params.PAGEUID)

  if (!typeToFetch) {
    redirect("/404")
  }

  const client = createClient();
  const page = await client
    .getSingle(typeToFetch as any, { lang: getLongLocale(params.locale) })
    .catch(() => redirect("/404"));

  return {
    title: (page.data as any).meta_title,
    description: (page.data as any).meta_description,
  };
}

// export async function generateStaticParams() {
//   const client = createClient();
//   const pages = await client.getAllByType("page");

//   return pages.map((page) => {
//     return { uid: page.uid };
//   });
// }
