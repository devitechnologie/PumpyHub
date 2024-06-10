"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { MdOutlineArrowForwardIos } from "react-icons/md"
import { RichTextField } from "@prismicio/client"
import { JSXMapSerializer, PrismicRichText } from "@prismicio/react"
import Heading from "./ui/Heading"
import Paragraph from "./ui/Paragraph"
import { PrismicNextLink } from "@prismicio/next"

const components: JSXMapSerializer = {
  heading3: ({ children }) => (
    <Heading
      as="h3"
      variant="h4"
      className="text-gray-800 text-lg font-semibold w-full"
    >
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => (
    <Paragraph
      className="text-gray-500 text-base mt-2"
    >
      {children}
    </Paragraph>
  ),
  hyperlink: ({ children, node }) => {
    return (
      <PrismicNextLink
        field={node.data}
        className="text-primary-green hover:underline"
      >
        {children}
      </PrismicNextLink>
    );
  }
}

export type FAQItemType = {
  question: RichTextField
  answer: RichTextField
}

type FAQListViewProps = {
  faqItems: FAQItemType[]
  defaultOpenIndex?: number | null
}

type FAQItemProps = {
  item: FAQItemType
  index: number
  openIndex: number | null
  handleToggle: (index: number) => void
}

const FAQListView = ({ faqItems, defaultOpenIndex }: FAQListViewProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex ?? null)

  const handleToggle = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index))
  }

  return (
    <div className="space-y-2">
      {faqItems.map((item, index) => {
        if (item.question.length === 0 || item.answer.length === 0) {
          return null
        }
        return (
          <FAQItem
            key={index}
            item={item}
            index={index}
            openIndex={openIndex}
            handleToggle={handleToggle}
          />
        )
      })}
    </div>
  )
}

const FAQItem = ({ item, index, openIndex, handleToggle }: FAQItemProps) => {
  return (
    <div
      onClick={() => handleToggle(index)}
      className="flex rounded-3xl transition-all items-start flex-col justify-between cursor-pointer border border-gray-200 py-4 px-6 w-full"
    >
      <div
        className="flex items-center justify-between w-full transition-all"
      >
        <div>
          <PrismicRichText
            field={item.question}
            components={components}
          />
        </div>
        <div
          className={`flex items-center justify-center transition-all w-10 h-10 rounded-full ml-4 text-xl`}
        >
          <div className="relative">
            <MdOutlineArrowForwardIos
              className={`text-xl text-gray-700 transform transition-transform ${openIndex === index ? "rotate-90" : ""
                }`}
            />
          </div>
        </div>
      </div>
      <AnimatePresence>
        {openIndex === index && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <PrismicRichText
              field={item.answer}
              components={components}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default FAQListView