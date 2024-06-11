import i18nConfig from "../../i18nConfig"

export type TLocals = typeof i18nConfig.locales[number]

/// edit the paths to match the ones in the prismicio.ts file
export const listNewsPaths: Record<TLocals, string> = {
  en: "news",
  fr: "actus",
  nl: "nieuws",
}

export const listRecipesPaths: Record<TLocals, string> = {
  en: "recipes",
  fr: "recettes",
  nl: "recepten"
}

export const listJobsPaths: Record<TLocals, string> = {
  en: "jobs",
  fr: "candidatures",
  nl: "vacatures"
}

export const listEventsPaths: Record<TLocals, string> = {
  en: "events",
  fr: "evenements",
  nl: "evenementen"
}

export const listContentPaths: Record<TLocals, string> = {
  en: "content",
  fr: "contenu",
  nl: "inhoud",
}

/// for the language switcher menu
export const langMenuData: {
  name: string
  locale: TLocals
}[] = [
    {
      name: "english", /// you must have the same name in the translation files located in the locales folder
      locale: "en",
    },
    {
      name: "french",
      locale: "fr",
    },
    {
      name: "dutch",
      locale: "nl",
    },
  ]

/// Get the document type to fetch based on the section we are using this in /[locale]/[section]/[UID]/page.tsx
export const getDocType = (section: string): string | null => {
  let typeToFetch = null

  if (section === listNewsPaths.en || section === listNewsPaths.fr || section === listNewsPaths.nl) {
    typeToFetch = "newspage"
  }

  if (section === listRecipesPaths.en || section === listRecipesPaths.fr || section === listRecipesPaths.nl) {
    typeToFetch = "recipespage"
  }

  if (section === listJobsPaths.en || section === listJobsPaths.fr || section === listJobsPaths.nl) {
    typeToFetch = "jobspage"
  }

  if (section === listEventsPaths.en || section === listEventsPaths.fr || section === listEventsPaths.nl) {
    typeToFetch = "eventpage"
  }

  if (section === listContentPaths.en || section === listContentPaths.fr || section === listContentPaths.nl) {
    typeToFetch = "pagecontent"
  }

  return typeToFetch
}

export const getPageDocType = (section: string): string | null => {
  let typeToFetch = null

  if (section === listNewsPaths.en || section === listNewsPaths.fr || section === listNewsPaths.nl) {
    typeToFetch = "news_list_page"
  }

  if (section === listRecipesPaths.en || section === listRecipesPaths.fr || section === listRecipesPaths.nl) {
    typeToFetch = "recipes_list_page"
  }

  if (section === listJobsPaths.en || section === listJobsPaths.fr || section === listJobsPaths.nl) {
    typeToFetch = "jobs_list_page"
  }

  if (section === listEventsPaths.en || section === listEventsPaths.fr || section === listEventsPaths.nl) {
    typeToFetch = "events_list_page"
  }

  return typeToFetch
}

/// Get the next path based on the locale we are using this in language switcher
export const getNextPath = (currentPath: string, newLocale: TLocals): string => {
  let nextPath = currentPath

  if (currentPath === listNewsPaths.en || currentPath === listNewsPaths.fr || currentPath === listNewsPaths.nl) {
    nextPath = listNewsPaths[newLocale]
  }

  if (currentPath === listRecipesPaths.en || currentPath === listRecipesPaths.fr || currentPath === listRecipesPaths.nl) {
    nextPath = listRecipesPaths[newLocale]
  }

  if (currentPath === listJobsPaths.en || currentPath === listJobsPaths.fr || currentPath === listJobsPaths.nl) {
    nextPath = listJobsPaths[newLocale]
  }

  if (currentPath === listEventsPaths.en || currentPath === listEventsPaths.fr || currentPath === listEventsPaths.nl) {
    nextPath = listEventsPaths[newLocale]
  }

  if (currentPath === listContentPaths.en || currentPath === listContentPaths.fr || currentPath === listContentPaths.nl) {
    nextPath = listContentPaths[newLocale]
  }

  return nextPath
}