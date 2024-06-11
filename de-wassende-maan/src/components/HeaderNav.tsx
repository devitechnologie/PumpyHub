"use client"

import Link from "next/link"
import { CiMenuBurger, CiUser } from "react-icons/ci"
import Image from "next/image"

import NavItem from "./NavItem"
import SearchBar from "./SearchBar"
import { useEffect, useState } from "react"
import { cn } from "@/utils/cn"
import Button from "./ui/Button"
import { IoCloseOutline } from "react-icons/io5"
import { NavigationDocument } from "../../prismicio-types"
import { useWindowScroll } from "@uidotdev/usehooks"
import { PrismicImage } from "@prismicio/react"

type HeaderNavProps = {
  data: NavigationDocument<string>
}

const HeaderNav = ({ data }: HeaderNavProps) => {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const { y } = useWindowScroll()[0]

  useEffect(() => {
    // last position
    let lastY = 0
    // scroll event
    const onScroll = () => {
      // current position
      const currentY = window.scrollY
      // if current position is greater than last position
      if (currentY > lastY) {
        setCollapsed(true)
      } else {
        setCollapsed(false)
      }
      // set last position
      lastY = currentY
    }
    // add event listener
    window.addEventListener("scroll", onScroll)
    // remove event listener
    return () => {
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  return (
    <div
      className={cn(
        "transition-all duration-300 bg-white h-[130px]",
        collapsed && "h-16",
        y && y > 0 && "shadow-green-bottom"
      )}
    >
      <div
        className={
          cn(
            "app-container flex items-stretch justify-between py-4 transition-all duration-300 h-[130px]",
            collapsed && "h-16"
          )
        }
      >
        {/* toggle btn */}
        <Button
          variant="none"
          onClick={() => {
            setIsNavOpen((prev) => !prev)
          }}
          className="flex items-center md:hidden"
        >
          <div
            className="text-2xl cursor-pointer text-slate-950"
          >
            <CiMenuBurger />
          </div>
        </Button>
        <Link
          href="/"
          className="cursor-pointer"
        >
          <div
            className={
              cn(
                "w-32 cursor-pointer select-none transition-all duration-300",
                collapsed && "w-14",
              )
            }
          >
            <PrismicImage 
              field={data.data.brand_logo}
              width={500}
              height={500}
              draggable={false}
              className="w-full h-full object-contain -mb-1"
            />
          </div>
        </Link>
        <div
          className="text-2xl cursor-pointer text-slate-950 md:hidden flex items-center"
        >
          <CiUser />
        </div>
        <div
          className={cn(
            "flex items-stretch flex-col md:flex-row md:gap-8 transition-all duration-300 fixed top-0 -left-full w-full h-full md:w-auto md:h-auto bg-white z-50 md:static",
            isNavOpen && "left-0"
          )}
        >
          {/* mobile header */}
          <div className="md:hidden relative">
            <div
              className="absolute top-0 right-0 p-4">
              <Button
                variant="none"
                onClick={() => {
                  setIsNavOpen(false)
                }}
                className="bg-gray-100 rounded-full p-2 hover:bg-gray-200 transition-all duration-300"
              >
                <IoCloseOutline />
              </Button>
            </div>
            <p
              className="text-2xl text-slate-950 font-semibold p-4 text-center"
            >
              De Wassende Maan
            </p>
          </div>
          {/* search */}
          <div
            className="flex items-center gap-4 md:hidden px-4 py-2"
          >
            <SearchBar
              mobile
            />
          </div>
          <nav
            className="flex items-stretch gap-2 md:gap-8 flex-col md:flex-row p-4 md:p-0 w-full relative"
          >
            {
              data.data.slices.map((slice, index) => (
                <NavItem
                  key={index}
                  slice={slice}
                  closeNav={() => {
                    setIsNavOpen(false)
                  }}
                />
              ))
            }
          </nav>
          <div
            className="hidden md:flex items-center pb-0.5"
          >
            <div
              className="flex items-stretch gap-4"
            >
              <SearchBar />
              {/* line */}
              <div
                className="w-[1px] h-6 bg-primary-green"
              />
              <div
                className="text-2xl cursor-pointer text-slate-950"
              >
                <CiUser />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderNav