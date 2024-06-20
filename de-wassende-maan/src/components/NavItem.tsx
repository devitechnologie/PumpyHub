"use client"

import { useWindowSize } from "@uidotdev/usehooks"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { IoIosArrowForward } from "react-icons/io"

import Button from "./ui/Button"
import { NavigationItemSlice } from "../../prismicio-types"
import { PrismicNextLink } from "@prismicio/next"

type NavItemProps = {
  slice: NavigationItemSlice
  closeNav?: () => void
}

const NavItem = ({ slice, closeNav }: NavItemProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const size = useWindowSize()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (size.width && size.width < 768) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }, [size.width])

  return (
    <div
      className="group flex items-center md:relative"
      onMouseEnter={() => {
        if (isMobile) return
        setIsOpen(true)
      }}
      onMouseLeave={() => {
        if (isMobile) return
        setIsOpen(false)
      }}
      onClick={() => {
        if (!isMobile) return
        setIsOpen((prev) => !prev)
      }}
    >
      <PrismicNextLink
        field={slice.primary.link_for_the_item}
        className="w-full flex md:inline items-center justify-between"
        onClick={(e) => {
          if (isMobile && slice.items.length > 0) {
            e.preventDefault()
            return
          }
          closeNav?.()
        }}
      >
        <span
          className="text-sm uppercase font-semibold cursor-pointer text-link-text"
        >
          {
            slice.primary.name_of_the_link
          }
        </span>
        {/* line */}
        <div
          className="absolute hidden md:block bottom-0 left-0 w-0 group-hover:w-full transition-all duration-300 h-0.5 bg-link-underlined"
        />
        {
          slice.items.length > 0 && (

            <div className="md:hidden">
              <IoIosArrowForward />
            </div>
          )
        }
      </PrismicNextLink>
      {/* drop down desktop */}
      <AnimatePresence>
        {isOpen && !isMobile && slice.items.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute z-50 w-full right-0 top-full pt-4 left-0"
          >
            <div className="bg-white p-4 space-y-4 shadow-bottom-right rounded-b-md z-10 w-max px-6">
              {/* items */}
              {
                slice.items.map((item, index) => (
                  <PrismicNextLink
                    key={index}
                    field={item.child_link}
                    onClick={() => {
                      setIsOpen(false)
                    }}
                    className="flex flex-col justify-center items-start relative w-fit"
                  >
                    <span
                      className="text-sm uppercase font-semibold cursor-pointer peer text-link-text"
                    >
                      {
                        item.child_name
                      }
                    </span>
                    {/* line */}
                    <div
                      className="w-0 peer-hover:w-full transition-all rounded-full duration-300 h-[1px] bg-link-underlined"
                    />
                  </PrismicNextLink>
                ))
              }
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* slide left mobile */}
      <AnimatePresence>
        {isOpen && isMobile && slice.items.length > 0 && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="absolute top-0 left-0 w-full h-full bg-white z-[999]"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            {/* back */}
            <Button
              variant="none"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-start gap-2 p-4 bg-white"
            >
              <IoIosArrowForward className="text-base transform rotate-180" />
              <span
                className="text-sm uppercase font-semibold cursor-pointer"
              >
                back
              </span>
            </Button>
            <div className="p-4 space-y-4 bg-white">
              {/* items */}
              {
                slice.items.map((item, index) => (
                  <PrismicNextLink
                    field={item.child_link}
                    key={index}
                    onClick={() => {
                      closeNav?.()
                    }}
                    className="flex flex-col justify-center items-start relative w-fit"
                  >
                    <span
                      className="text-sm capitalize font-medium text-slate-600 cursor-pointer peer"
                    >
                      {
                        item.child_name
                      }
                    </span>
                    {/* line */}
                    <div
                      className="w-0 peer-hover:w-full transition-all rounded-full duration-300 h-[1px] bg-primary"
                    />
                  </PrismicNextLink>
                ))
              }
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default NavItem