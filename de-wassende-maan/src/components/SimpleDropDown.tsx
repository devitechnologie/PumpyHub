"use client"

import { FaChevronDown } from "react-icons/fa"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PrismicNextLink } from "@prismicio/next"
import Button from "./ui/Button"

export type DropDownType = {
  field: React.ComponentProps<typeof PrismicNextLink>["field"]
  label: string
}

type SimpleDropDownProps = {
  list: DropDownType[]
  onChange?: (item: string) => void
  placeholder: string
}

const SimpleDropDown = ({ list, placeholder }: SimpleDropDownProps) => {
  const [showDropDown, setShowDropDown] = useState(false)

  return (
    <div
      className="flex items-center gap-2 relative z-[99999]"
    >
      <Button
        variant="none"
        onClick={() => setShowDropDown((prev) => !prev)}
        onBlur={() => setShowDropDown(false)}
        tabIndex={0}
        className="text-sm uppercase font-semibold text-primary-white flex items-center gap-1 cursor-pointer"
      >
        <span>
          {placeholder}
        </span>
        <FaChevronDown />
      </Button>

      {/* dropdown */}
      <AnimatePresence>
        {
          showDropDown && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-8 right-0 w-max bg-white shadow-card-shadow-border rounded-md p-4"
            >
              <div
                className="flex flex-col gap-2"
              >
                {
                  list.map((item, i) => (
                    <PrismicNextLink
                      key={i}
                      field={item.field}
                      className="text-sm uppercase font-semibold text-primary-green-dark-dwm hover:underline cursor-pointer"
                    >
                      {item.label}
                    </PrismicNextLink>
                  ))
                }
              </div>
            </motion.div>
          )
        }
      </AnimatePresence>
    </div>
  )
}

export default SimpleDropDown