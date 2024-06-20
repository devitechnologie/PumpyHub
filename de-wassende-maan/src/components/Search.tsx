"use client"

import Button from './ui/Button'
import { createQueryString } from '@/utils/helpers'

import { CiSearch } from 'react-icons/ci'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'

const Search = () => {
  const { t } = useTranslation()
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const search = formData.get('search') as string

    router.push(`${pathname}?${createQueryString('search', search, searchParams)}`)
  }

  return (
    <form
      className="w-full relative"
      onSubmit={onSearch}
    >
      <input
        type="text"
        name="search"
        id='search'
        placeholder={t('search')}
        className="w-full pr-9 pl-4 py-3 border border-gray-300 rounded-md outline-none focus:border-input-focus-primary"
      />
      <Button
        className="text-2xl rounded-md p-2 bg-button-primary-hover text-white hover:bg-opacity-80 transition-all cursor-pointer absolute top-1/2 right-2 transform -translate-y-1/2"
      >
        <div>
          <CiSearch />
        </div>
      </Button>
    </form>
  )
}

export default Search