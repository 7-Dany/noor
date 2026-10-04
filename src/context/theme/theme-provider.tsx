import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react"

import { themeStore, type ThemePreference } from "./theme-store"

type ThemeProviderProps = {
  children: ReactNode
  initialTheme: ThemePreference
  disableTransitionOnChange?: boolean
}

type ThemeProviderState = {
  theme: ThemePreference
  setTheme: (theme: ThemePreference) => void
  toggleTheme: () => void
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(
  undefined
)

export function ThemeProvider({
  children,
  initialTheme,
  disableTransitionOnChange = true,
}: ThemeProviderProps) {
  const theme = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getSnapshot,
    themeStore.getServerSnapshot
  )

  useEffect(() => {
    themeStore.initialize(initialTheme)
    return themeStore.mount()
  }, [initialTheme])

  useEffect(() => {
    themeStore.applyToDocument(disableTransitionOnChange)
  }, [theme, disableTransitionOnChange])

  const value = useMemo(
    () => ({
      theme,
      setTheme: (next: ThemePreference) => themeStore.setPreference(next),
      toggleTheme: () => themeStore.toggle(),
    }),
    [theme]
  )

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  return context
}
