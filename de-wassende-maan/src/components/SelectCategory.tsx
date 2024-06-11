"use client"

import { cn } from "@/utils/cn"
import Button from "./ui/Button"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { createQueryString } from "@/utils/helpers"

type SelectCategoryProps = {
  idCategory: string
  name: string
  count: number
  isSelected: boolean
}

const SelectCategory = ({ idCategory, name, count, isSelected }: SelectCategoryProps) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const onSelectedCategory = () => {
    router.push(`${pathname}?${createQueryString('category', idCategory, searchParams)}`)
  }

  return (
    <Button
      variant="none"
      onClick={onSelectedCategory}
      className={
        cn(
          "text-base text-gray-500 flex items-center justify-between w-full font-medium",
          isSelected ? "text-primary-green" : "hover:text-primary-green"
        )
      }
    >
      <span>
        {name}
      </span>
      <span>
        ({count})
      </span>
    </Button>
  )
}

export default SelectCategory