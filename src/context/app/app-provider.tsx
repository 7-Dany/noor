import type { ReactNode } from "react"
import { DirectionProvider } from "@base-ui/react/direction-provider"

import { ThemeProvider } from "../theme/theme-provider"
import type { ThemePreference } from "../theme/theme-store"

/** Gathers every upper-level app context. Add future providers here. */
export function AppProvider({
  children,
  initialTheme,
}: {
  children: ReactNode
  initialTheme: ThemePreference
}) {
  return (
    <ThemeProvider initialTheme={initialTheme}>
      <DirectionProvider direction="rtl">{children}</DirectionProvider>
    </ThemeProvider>
  )
}
