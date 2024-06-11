"use client"

import Link from "next/link";
import { NewspageDocument } from "../../prismicio-types";
import { PrismicRichText } from "@prismicio/react";
import { format } from "date-fns"
import { fr, nl, enUS } from 'date-fns/locale'
import { useTranslation } from "react-i18next";
import { PrismicNextImage } from "@prismicio/next";

import Badge from "@/components/ui/Badge";
import Paragraph from "@/components/ui/Paragraph";
import Heading from "./ui/Heading";
import Button from "./ui/Button";
import { listNewsPaths } from "@/utils/routesData";

type NewsCardProps = {
  news: NewspageDocument
  horizontal?: boolean
  size?: 'small'
  isLatest?: boolean
}

const NewsCard = ({ news, horizontal, size, isLatest }: NewsCardProps) => {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const path = listNewsPaths[lang as 'en' | 'fr' | 'nl']

  if (horizontal && size === 'small') {
    return (
      <Link
        href={`/${path}/${news.uid}`}
        className="flex items-center gap-2 group"
      >
        <div
          className="aspect-square h-[100px] min-w-[100px] rounded-[20px] overflow-hidden"
        >
          <PrismicNextImage
            field={news.data.image}
            width={800}
            height={533}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="space-y-2">
          <Badge
            variant="primary"
            className="w-fit uppercase font-semibold text-xs py-0.5"
          >
            {
              isLatest && news.tags.length > 0 ? news.tags[0] : t("news")
            }
          </Badge>
          <PrismicRichText
            field={news.data.title}
            components={{
              heading1: ({ children }) => (
                <Heading
                  as="h4"
                  variant="h5"
                  className="font-semibold group-hover:underline cursor-pointer line-clamp-3"
                >
                  {children}
                </Heading>
              ),
            }}
          />
        </div>
      </Link>
    )
  }

  if (horizontal) {
    return (
      <Link
        href={`/${path}/${news.uid}`}
        className="block space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:space-x-8 group sm:place-items-center"
      >
        <div
          className="aspect-[3/2] sm:aspect-video sm:h-[290px] sm:w-full rounded-[20px] overflow-hidden"
        >
          <PrismicNextImage
            field={news.data.image}
            width={800}
            height={533}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="space-y-2">
          <Badge
            variant="primary"
            className="w-fit uppercase font-semibold py-1"
          >
            {
              isLatest && news.tags.length > 0 ? news.tags[0] : t("news")
            }
          </Badge>
          <PrismicRichText
            field={news.data.title}
            components={{
              heading1: ({ children }) => (
                <Heading
                  as="h4"
                  variant="h3"
                  className="font-semibold group-hover:underline cursor-pointer line-clamp-2"
                >
                  {children}
                </Heading>
              ),
            }}
          />
          <Paragraph size="base" className="capitalize mb-4">
            - {format(news.first_publication_date, "MMMM dd, yyyy", { locale: lang === 'fr' ? fr : lang === 'nl' ? nl : enUS })}
          </Paragraph>
          <Paragraph className="line-clamp-4 text-gray-500" size="lg">
            {news.data.short_description}
          </Paragraph>
          <Button
            variant="link"
          >
            {
              t("read_more")
            }
          </Button>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={`/${path}/${news.uid}`}
      className="block group space-y-4"
    >
      <div
        className="aspect-[3/2] rounded-[20px] overflow-hidden"
      >
        <PrismicNextImage
          field={news.data.image}
          width={800}
          height={533}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="space-y-2">
        <Badge
          variant="primary"
          className="w-fit uppercase font-semibold py-1"
        >
          {
            isLatest && news.tags.length > 0 ? news.tags[0] : t("news")
          }
        </Badge>
        <PrismicRichText
          field={news.data.title}
          components={{
            heading1: ({ children }) => (
              <Heading
                as="h4"
                variant="h3"
                className="font-semibold group-hover:underline cursor-pointer line-clamp-2"
              >
                {children}
              </Heading>
            ),
          }}
        />
        <Paragraph className="line-clamp-3">
          {news.data.short_description}
        </Paragraph>
        <Paragraph size="sm" className="capitalize">
          - {format(news.first_publication_date, "MMMM dd, yyyy", { locale: lang === 'fr' ? fr : lang === 'nl' ? nl : enUS })}
        </Paragraph>
      </div>
    </Link>
  )
}

export default NewsCard