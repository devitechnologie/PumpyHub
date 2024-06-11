import { create, StateCreator } from "zustand"
import { createClient } from "@/prismicio"

type LangState = {
  locales: string[]
  getLocales: () => Promise<void>
}

export const createLangStore: StateCreator<LangState> = (set) => ({
  locales: [],
  getLocales: async () => {
    const client = createClient()
    const repo = await client.getRepository()
    const locales = repo.languages.map((lang) => lang.id)
    set({ locales })
  },
})

export const useLangStore = create(createLangStore)