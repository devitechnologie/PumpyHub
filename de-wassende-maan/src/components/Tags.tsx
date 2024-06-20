"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import Button from "./ui/Button"
import Heading from "./ui/Heading"
import { createQueryString } from "@/utils/helpers"
import { cn } from "@/utils/cn"

type TagsProps = {
  tags: string[]
  selectedTag: string | undefined
}

const Tags = ({ tags, selectedTag }: TagsProps) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const onTagClick = (tag: string) => {
    router.push(`${pathname}?${createQueryString('tag', tag, searchParams)}`)
  }

  return (
    <div>
      <Heading
        as="h3"
        variant="h3"
        className="text-heading-secondary"
      >
        Tags
      </Heading>
      <div
        className="mt-4 flex flex-wrap gap-2"
      >
        {
          tags.map((tag) => (
            <Button
              key={tag}
              onClick={() => onTagClick(tag)}
              variant="none"
              className={
                cn(
                  "bg-primary-white hover:border-transparent border border-gray-300 text-primary-black rounded-full px-4 py-1.5 text-sm hover:bg-primary hover:text-white transition-all duration-300",
                  selectedTag === tag ? "bg-primary text-white border-transparent" : ""
                )
              }
            >
              {tag}
            </Button>
          ))
        }
      </div>
    </div>
  )
}

export default Tags