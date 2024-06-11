import { create, StateCreator } from "zustand"
import { createClient } from "@/prismicio"
import { SettingsDocument } from "../../../prismicio-types"
import { useEffect } from "react"

type SettingsState = {
  settings: SettingsDocument<string> | null
  fetchSettings: (lang?: string) => Promise<void>
  isLoading: boolean
  isError: boolean
}

const createSettings: StateCreator<SettingsState> = (set, get) => ({
  settings: null,
  isLoading: true,
  isError: false,
  fetchSettings: async (lang) => {
    if (!get().settings) set({ isLoading: true })
    try {
      const client = createClient()
      const settings = await client.getSingle("settings", { lang })
      set({ settings, isLoading: false })
    } catch (error) {
      set({ isError: true, isLoading: false })
    }
  },
})

const useSettingsStore = create(createSettings)

export const useSettings = (lang?: string) => {
  const settings = useSettingsStore((state) => state.settings)
  const fetchSettings = useSettingsStore((state) => state.fetchSettings)
  const isLoading = useSettingsStore((state) => state.isLoading)
  const isError = useSettingsStore((state) => state.isError)

  useEffect(() => {
    fetchSettings(lang)
  }, [fetchSettings, lang])

  return { settings, refetch: fetchSettings, isLoading, isError }
}