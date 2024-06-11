import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";
import config from "../slicemachine.config.json";

/**
 * The project's Prismic repository name.
 */
export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || config.repositoryName;

/**
 * A list of Route Resolver objects that define how a document's `url` field is resolved.
 *
 * {@link https://prismic.io/docs/route-resolver#route-resolver}
 */
const routes: prismic.ClientConfig["routes"] = [
  {
    type: "homepage",
    path: "/",
  },
  {
    type: "contactpage",
    path: "/contact",
  },
  {
    type: "newspage",
    path: "/news/:uid",
    lang: "en-us"
  },
  {
    type: "newspage",
    path: "/actus/:uid",
    lang: "fr-fr"
  },
  {
    type: "newspage",
    path: "/nieuws/:uid",
    lang: "nl-be"
  },
  {
    type: "news_list_page",
    path: "/news",
    lang: "en-us"
  },
  {
    type: "news_list_page",
    path: "/actus",
    lang: "fr-fr"
  },
  {
    type: "news_list_page",
    path: "/nieuws",
    lang: "nl-be"
  },
  {
    type: "recipespage",
    path: "/recipes/:uid",
    lang: "en-us"
  },
  {
    type: "recipespage",
    path: "/recettes/:uid",
    lang: "fr-fr"
  },
  {
    type: "recipespage",
    path: "/recepten/:uid",
    lang: "nl-be"
  },
  {
    type: "recipes_list_page",
    path: "/recipes",
    lang: "en-us"
  },
  {
    type: "recipes_list_page",
    path: "/recettes",
    lang: "fr-fr"
  },
  {
    type: "recipes_list_page",
    path: "/recepten",
    lang: "nl-be"
  },
  {
    type: "jobspage",
    path: "/jobs/:uid",
    lang: "en-us"
  },
  {
    type: "jobspage",
    path: "/candidatures/:uid",
    lang: "fr-fr"
  },
  {
    type: "jobspage",
    path: "/vacatures/:uid",
    lang: "nl-be"
  },
  {
    type: "jobs_list_page",
    path: "/jobs",
    lang: "en-us"
  },
  {
    type: "jobs_list_page",
    path: "/candidatures",
    lang: "fr-fr"
  },
  {
    type: "jobs_list_page",
    path: "/vacatures",
    lang: "nl-be"
  },
  {
    type: "eventpage",
    path: "/events/:uid",
    lang: "en-us"
  },
  {
    type: "eventpage",
    path: "/evenements/:uid",
    lang: "fr-fr"
  },
  {
    type: "eventpage",
    path: "/evenementen/:uid",
    lang: "nl-be"
  },
  {
    type: "events_list_page",
    path: "/events",
    lang: "en-us"
  },
  {
    type: "events_list_page",
    path: "/evenements",
    lang: "fr-fr"
  },
  {
    type: "events_list_page",
    path: "/evenementen",
    lang: "nl-be"
  },
  {
    type: "pagecontent",
    path: "/content/:uid",
    lang: "en-us"
  },
  {
    type: "pagecontent",
    path: "/contenu/:uid",
    lang: "fr-fr"
  },
  {
    type: "pagecontent",
    path: "/inhoud/:uid",
    lang: "nl-be"
  },
  {
    type: "searchresult",
    path: "/search-result",
  },
  {
    type: "faq_page",
    path: "/faq",
  },
];

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config - Configuration for the Prismic client.
 */
export const createClient = (config: prismicNext.CreateClientConfig = {}) => {
  const client = prismic.createClient(repositoryName, {
    routes,
    fetchOptions:
      process.env.NODE_ENV === "production"
        ? { next: { tags: ["prismic"] }, cache: "force-cache" }
        : { next: { revalidate: 5 } },
    ...config,
  });

  prismicNext.enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  });

  return client;
};
