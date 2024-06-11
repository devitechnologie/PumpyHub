import { CiSearch } from "react-icons/ci"
import { useState } from "react"

import Button from "./ui/Button"
import ModalWrapper from "./wrappers/ModalWrapper"
import Input from "./ui/Input"

type SearchBarProps = {
  mobile?: boolean
  isInLine?: boolean
}

type SearchModalProps = {
  isOpen: boolean
  onClose: () => void
}

const SearchBar = ({ mobile, isInLine }: SearchBarProps) => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)

  if (isInLine) {
    return (
      <form className="w-full">
        <div className='relative'>
          <Input
            variant="secondary"
            placeholder="Search for products"
            className="w-full rounded-xl py-3 border border-gray-300 focus:border-primary-green-dark-dwm duration-300 focus:ring-0"
          />
          <div className="h-full absolute right-0 top-0 p-1">
            <Button
              variant="secondary"
              className="px-6 py-2 uppercase text-sm h-full rounded-xl bg-primary-lime hover:bg-primary-black hover:text-white flex items-center gap-2"
            >
              Search
            </Button>
          </div>
        </div>
      </form>
    )
  }

  if (mobile) {
    return (
      <div className="w-full relative">
        <input
          type="text"
          placeholder="What are you looking for?"
          className="w-full pl-9 pr-4 py-1.5 border border-gray-300 rounded-md outline-none focus:border-primary-green"
        />
        <Button
          variant="none"
          className="block text-2xl cursor-pointer text-slate-950 absolute top-1/2 left-2 transform -translate-y-1/2"
        >
          <CiSearch />
        </Button>
      </div>
    )
  }

  return (
    <>
      <Button
        onClick={() => setIsSearchModalOpen(true)}
        variant="none"
        className="text-2xl cursor-pointer text-slate-950"
      >
        <CiSearch />
      </Button>
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </>
  )
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      className="p-4 md:p-6 rounded-2xl md:max-w-[800px]"
    >
      <form className="w-full relative">
        <input
          type="text"
          placeholder="What are you looking for?"
          className="w-full pr-9 pl-4 py-3 border border-gray-300 rounded-md outline-none focus:border-primary-green"
        />
        <Button
          className="text-2xl bg-primary-green rounded-md p-2 text-white hover:bg-opacity-80 transition-all cursor-pointer absolute top-1/2 right-2 transform -translate-y-1/2"
        >
          <div

          >
            <CiSearch />
          </div>
        </Button>
      </form>
      {/* resent searches */}
      <div
        className="mt-4"
      >
        <p
          className="text-lg font-semibold"
        >
          Recent Searches
        </p>
        <div
          className="flex flex-wrap gap-2 mt-2"
        >
          <SearchBadge text="Cabbage" />
          <SearchBadge text="Carrot" />
          <SearchBadge text="Tomato" />
          <SearchBadge text="Potato" />
          <SearchBadge text="Cucumber" />
          <SearchBadge text="Onion" />
          <SearchBadge text="Garlic" />
          <SearchBadge text="Ginger" />
          <SearchBadge text="Beetroot" />
          <SearchBadge text="Radish" />
        </div>
      </div>
    </ModalWrapper>
  )
}

const SearchBadge = ({ text }: { text: string }) => {
  return (
    <Button
      variant="none"
      className="bg-gray-100 text-slate-950 rounded-full px-4 py-2 text-sm hover:bg-primary-green hover:text-white transition-all duration-300"
    >
      <p>
        {text}
      </p>
    </Button>
  )
}

export default SearchBar