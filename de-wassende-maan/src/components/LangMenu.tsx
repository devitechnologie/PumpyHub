"use client"

import { IoIosArrowDown } from "react-icons/io"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { FaCheck } from "react-icons/fa"
import { usePathname, useRouter } from "next/navigation"

import Button from "./ui/Button"
import { cn } from "@/utils/cn"
import { useTranslation } from "react-i18next"
import i18nConfig from "../../i18nConfig"
import { getNextPath, listEventsPaths, listJobsPaths, listNewsPaths, listRecipesPaths } from "@/utils/routesData"

const LangMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()

  return (
    <div
      className="relative"
    >
      <Button
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setIsOpen(false)}
        variant="link"
        className="flex items-center gap-2 cursor-pointer text-white py-0 px-0 hover:underline uppercase font-semibold text-sm tracking-widest"
      >
        <span>
          {t("language")}
        </span>
        <IoIosArrowDown
          className="text-lg"
        />
      </Button>

      <DropdownLang
        isOpen={isOpen}
      />
    </div>
  )
}

const DropdownLang = (
  { isOpen }: {
    isOpen: boolean
  }
) => {
  const { i18n, t } = useTranslation()
  const currentLocale = i18n.language as 'en' | 'fr' | 'nl'
  const router = useRouter()
  let currentPathname = usePathname()

  // const listProductsPaths = {
  //   en: "products",
  //   fr: "produits",
  //   nl: "producten"
  // }

  const handleChange = (newLocale: 'en' | 'fr' | 'nl') => {

    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    const currentPathList = currentPathname.split('/')
    let indexPath = currentPathList.length === 3 ? 1 : 2

    if (currentLocale === 'en' && currentPathList.length === 2 || currentLocale !== 'en' && currentPathList.length === 3) {
      indexPath = currentPathList.length === 2 ? 1 : 2
    }
    
    currentPathList[indexPath] = getNextPath(currentPathList[indexPath], newLocale)
    currentPathname = currentPathList.join('/')

    // replace the blog path index with the new locale
    // if (currentPathList[indexPath] === 'products' || currentPathList[indexPath] === 'produits' || currentPathList[indexPath] === 'producten') {
    //   currentPathList[indexPath] = listProductsPaths[newLocale as 'en' | 'fr' | 'nl']
    // console.log('newBlogPath', currentPathList.join('/'), currentPathname)
    //   currentPathname = currentPathList.join('/')
    // }

    // replace the news path index with the new locale
    // if (currentPathList[indexPath] === listNewsPaths.en || currentPathList[indexPath] === listNewsPaths.fr || currentPathList[indexPath] === listNewsPaths.nl) {
    //   currentPathList[indexPath] = listNewsPaths[newLocale as 'en' | 'fr' | 'nl']
    //   currentPathname = currentPathList.join('/')
    // }

    // replace the recipes path index with the new locale
    // if (currentPathList[indexPath] === listRecipesPaths.en || currentPathList[indexPath] === listRecipesPaths.fr || currentPathList[indexPath] === listRecipesPaths.nl) {
    //   currentPathList[indexPath] = listRecipesPaths[newLocale as 'en' | 'fr' | 'nl']
    //   currentPathname = currentPathList.join('/')
    // }

    // replace the jobs path index with the new locale
    // if (currentPathList[indexPath] === listJobsPaths.en || currentPathList[indexPath] === listJobsPaths.fr || currentPathList[indexPath] === listJobsPaths.nl) {
    //   currentPathList[indexPath] = listJobsPaths[newLocale as 'en' | 'fr' | 'nl']
    //   currentPathname = currentPathList.join('/')
    // }

    // replace the events path index with the new locale
    // if (currentPathList[indexPath] === listEventsPaths.en || currentPathList[indexPath] === listEventsPaths.fr || currentPathList[indexPath] === listEventsPaths.nl) {
    //   currentPathList[indexPath] = listEventsPaths[newLocale as 'en' | 'fr' | 'nl']
    //   currentPathname = currentPathList.join('/')
    // }

    // redirect to the new locale path
    if (
      currentLocale === i18nConfig.defaultLocale &&
      !(i18nConfig as any).prefixDefault
    ) {
      router.push('/' + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }

    router.refresh();
  }

  const checked = (checked: boolean) => {
    return (
      <div
        className={
          cn(
            "text-gray-400 p-2 bg-gray-100 rounded-full",
            !checked && "opacity-0"
          )
        }
      >
        <FaCheck />
      </div>
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute z-[9999] top-full left-0 bg-white shadow-card-shadow-border mt-1.5 rounded-lg overflow-hidden"
        >
          <ul
            className="flex flex-col items-stretch min-w-[230px] font-medium text-sm text-primary-black"
          >
            <li>
              <Button
                onClick={() => handleChange("en")}
                variant="none"
                className="flex items-center justify-between gap-4 w-full hover:bg-gray-100 px-5 py-2"
              >
                <span className="capitalize">
                  {t("english")}
                </span>
                {checked(currentLocale === "en")}
              </Button>
            </li>
            {/* divider */}
            <li>
              <hr
                className="border-t border-gray-200"
              />
            </li>
            <li>
              <Button
                onClick={() => handleChange("fr")}
                variant="none"
                className="flex items-center justify-between gap-4 w-full hover:bg-gray-100 px-5 py-2"
              >
                <span className="capitalize">
                  {t("french")}
                </span>
                {checked(currentLocale === "fr")}
              </Button>
            </li>
            {/* divider */}
            <li>
              <hr
                className="border-t border-gray-200"
              />
            </li>
            <li>
              <Button
                onClick={() => handleChange("nl")}
                variant="none"
                className="flex items-center justify-between gap-4 w-full hover:bg-gray-100 px-5 py-2"
              >
                <span className="capitalize">
                  {
                    t("dutch")
                  }
                </span>
                {checked(currentLocale === "nl")}
              </Button>
            </li>

          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LangMenu