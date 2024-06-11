"use client"

import Heading from './ui/Heading'

import Link from 'next/link'
import { IoIosArrowForward } from 'react-icons/io'

type DefaultCoverProps = {
  fromTitle: string
  fromLink: string
  inTitle: string
}

const DefaultCover = ({ fromTitle, fromLink, inTitle }: DefaultCoverProps) => {

  return (
    <section
      className="bg-primary-rose-light section-py flex items-center flex-col gap-2 justify-center w-full"
    >
      <Heading
        as="h6"
        variant="h1"
        className="leading-snug font-semibold text-center"
      >
        {fromTitle}
      </Heading>
      <div className="flex gap-2 items-center justify-center text-sm">
        <Link
          href="/"
          passHref
          aria-label="Home page"
          className="text-gray-700 hover:underline"
        >
          Home page
        </Link>
        <IoIosArrowForward className="-mb-0.5 text-gray-400 text-sm" />
        <Link
          href={fromLink}
          passHref
          aria-label={fromTitle}
          className="text-gray-700 hover:underline"
        >
          {fromTitle}
        </Link>
        <IoIosArrowForward className="-mb-0.5 text-gray-400 text-sm" />
        <span
          className="text-gray-400"
        >
          {inTitle}
        </span>
      </div>
    </section>
  )
}

export default DefaultCover