import type { ReactNode } from "react"
import { DirectionProvider } from "@base-ui/react/direction-provider"

import { ThemeProvider } from "../theme/theme-provider"
import type { ThemePreference } from "../theme/theme-store"

/**
 * Single source of truth for text direction. Feeds both <html dir> (root.tsx)
 * and the Base UI DirectionProvider, so they can never disagree.
 */
export const APP_DIRECTION = "ltr" as "ltr" | "rtl"

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
      <DirectionProvider direction={APP_DIRECTION}>
        {children}
      </DirectionProvider>
    </ThemeProvider>
  )
}
