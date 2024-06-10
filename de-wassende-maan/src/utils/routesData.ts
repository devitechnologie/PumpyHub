export const listNewsPaths = {
  en: "news",
  fr: "nouvelles",
  nl: "nieuws"
}

export const listRecipesPaths = {
  en: "recipes",
  fr: "recettes",
  nl: "recepten"
}

export const listJobsPaths = {
  en: "jobs",
  fr: "emplois",
  nl: "banen"
}

export const listEventsPaths = {
  en: "events",
  fr: "evenements",
  nl: "evenementen"
}

export const listContentPaths = {
  en: "content",
  fr: "contenu",
  nl: "inhoud"
}

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

/// Get the next path based on the locale we are using this in language switcher
export const getNextPath = (currentPath: string, newLocale: 'en' | 'fr' | 'nl') => {
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