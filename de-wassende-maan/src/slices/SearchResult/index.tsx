"use client"

import ProductCard from "@/components/ProductCard"
import SearchBar from "@/components/SearchBar"
import Heading from "@/components/ui/Heading"
import Paragraph from "@/components/ui/Paragraph"
import Bounded from "@/components/wrappers/Bounded"

import { Content } from "@prismicio/client"
import { SliceComponentProps } from "@prismicio/react"

/**
 * Props for `SearchResult`.
 */
export type SearchResultProps = SliceComponentProps<Content.SearchResultSlice>

/**
 * Component for "SearchResult" Slices.
 */
const SearchResult = ({ slice }: SearchResultProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="section-py"
    >
      <SearchByText />
      <SearchHeader />
      <ResultsList />
    </Bounded>
  )
}

const ResultsList = () => {
  return (
    <div 
    className="grid gap-4 md:gap-8 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {
        Array.from({ length: 12 }).map((_, index) => (
          <ProductCard
            key={index}
            num={index}
          />
        ))
      }
    </div>
  )

}

const SearchByText = () => {
  return (
    <div className="flex flex-col gap-6 items-center justify-center text-center mb-8 md:mb-10">
      <Heading
        as="h2"
        variant="h2"
        className="text-primary-green-dark-dwm"
      >
        Found 170 results for &quot;Search Query&quot;
      </Heading>
      <div
        className="w-full md:w-2/6"
      >
        <SearchBar
          isInLine
        />
      </div>
    </div>
  )
}

const SearchHeader = () => {
  return (
    <div className="flex items-center justify-between mb-2">
      <Paragraph
        size="lg"
        className="text-primary-green-dark-dwm font-semibold"
      >
        Search Results
      </Paragraph>
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-500">Sort by:</span>
        <select className="text-sm text-gray-500 border border-gray-300 rounded-md px-2 py-1">
          <option>Relevance</option>
          <option>Newest</option>
          <option>Oldest</option>
        </select>
      </div>
    </div>
  )
}

export default SearchResult
