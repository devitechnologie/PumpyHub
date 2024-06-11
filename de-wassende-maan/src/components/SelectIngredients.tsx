"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import Button from "./ui/Button"
import { createQueryStringArray } from "@/utils/helpers"
import { cn } from "@/utils/cn"

type SelectIngredientsProps = {
  idIngredients: string
  name: string
  isSelected: boolean
}

const SelectIngredients = ({ idIngredients, name, isSelected }: SelectIngredientsProps) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const onSelectedIngredients = () => {
    // push the selected ingredient to the query string array
    const ingredients = JSON.parse(searchParams.get('ingredient') || '[]')
    router.push(`${pathname}?${createQueryStringArray('ingredient', [...ingredients, idIngredients], searchParams)}`)
  }

  return (
    <Button
      variant="outlined"
      className={
        cn(
          "capitalize font-medium",
          isSelected && "bg-primary-green text-white"
        )
      }
      onClick={onSelectedIngredients}
    >
      {name}
    </Button>
  )
}

export default SelectIngredients