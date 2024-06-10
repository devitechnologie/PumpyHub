"use client"

import Button from "./ui/Button"
import { cn } from "@/utils/cn"

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { createQueryString } from "@/utils/helpers"

type ListPaginationProps = {
  totalPages: number
  currentPage: number
}

const ListPagination = ({ totalPages, currentPage }: ListPaginationProps) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const onPageChange = (page: number) => {
    router.push(`${pathname}?${createQueryString("page", page.toString(), searchParams)}`)
  }

  return (
    <div
      className="flex items-center justify-start mt-8 gap-2"
    >
      {
        currentPage > 1 && (
          <Button
            variant="none"
            onClick={() => onPageChange(currentPage - 1)}
            className="border hover:border-transparent border-gray-300 text-gray-500 grid place-items-center rounded-md aspect-square w-10 h-10 hover:bg-primary-green hover:text-white transition-all"
          >
            <IoIosArrowBack />
          </Button>
        )
      }
      {
        Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            onClick={() => onPageChange(page)}
            variant="none"
            className={
              cn(
                "border hover:border-transparent border-gray-300 text-gray-500 grid place-items-center rounded-md aspect-square w-10 h-10 hover:bg-primary-green hover:text-white transition-all",
                currentPage === page && "bg-primary-green text-white border-transparent"
              )
            }
          >
            {page}
          </Button>
        ))
      }
      {
        currentPage < totalPages && (
          <Button
            variant="none"
            onClick={() => onPageChange(currentPage + 1)}
            className="border hover:border-transparent border-gray-300 text-gray-500 grid place-items-center rounded-md aspect-square w-10 h-10 hover:bg-primary-green hover:text-white transition-all"
          >
            <IoIosArrowForward />
          </Button>
        )
      }
    </div>
  )
}

export default ListPagination