export const getLongLocale = (locale: string) => {
  switch (locale) {
    case 'en':
      return 'en-us'
    case 'nl':
      return 'nl-be'
    case 'fr':
      return 'fr-fr'
    default:
      return 'en-us'
  }
}

export const getShortLocale = (locale: string) => {
  switch (locale) {
    case 'en-us':
      return 'en'
    case 'nl-be':
      return 'nl'
    case 'fr-fr':
      return 'fr'
    default:
      return 'en'
  }
}

export const groupByCategory = (array: any[]) => {
  return array.reduce((acc: any, obj: any) => {
    const key = obj.categorie.id;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}

export const createQueryString = (name: string, value: string, searchParams: URLSearchParams) => {
  const params = new URLSearchParams(searchParams.toString())
  params.set(name, value)

  return params.toString()
}

export const createQueryStringArray = (name: string, value: string[], searchParams: URLSearchParams) => {
  const params = new URLSearchParams(searchParams.toString())
  params.set(name, JSON.stringify(value))

  return params.toString()
}