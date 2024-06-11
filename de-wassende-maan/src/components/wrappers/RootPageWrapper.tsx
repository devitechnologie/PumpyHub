import initTranslations from "@/app/i18n"
import TranslationsProvider from "./TranslationsProvider"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import QueryClientWrapper from "@/components/wrappers/QueryClientWrapper"
import { repositoryName } from "@/prismicio"

import { ToastContainer } from 'react-toastify'
import { PrismicPreview } from "@prismicio/next"

type RootPageWrapperProps = {
  locale: string
  children: React.ReactNode
}

const RootPageWrapper = async ({ locale, children }: RootPageWrapperProps) => {
  const { resources } = await initTranslations(locale, ['*'], null, null)

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={['*']}
    >
      <QueryClientWrapper>
        <Navbar
          locale={locale}
        />
        <main className="min-h-screen bg-white pt-[var(--nav-height)]">
          {children}
        </main>
        <Footer
          locale={locale}
        />

        <ToastContainer />
        <PrismicPreview repositoryName={repositoryName} />
      </QueryClientWrapper>
    </TranslationsProvider>
  )
}

export default RootPageWrapper