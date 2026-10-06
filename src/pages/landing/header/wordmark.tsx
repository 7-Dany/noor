import { Link } from "react-router"

import { SunMoon } from "@/components/icons/sun-moon"
import { useTheme } from "@/context/theme/theme-provider"

// The sun (moon in dark mode) is the theme toggle; "Noor" is the home link.
// They are siblings because a button can't sit inside a link.
export function Wordmark() {
  const { toggleTheme } = useTheme()

  return (
    <div data-slot="site-header-brand" className="flex items-center gap-2">
      <button
        type="button"
        data-slot="theme-toggle"
        aria-label="Toggle dark mode"
        onClick={() => toggleTheme()}
        className="grid cursor-pointer place-items-center rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <SunMoon className="size-10.5" />
      </button>
      <Link to="/" aria-label="Noor home">
        <span className="font-serif text-2xl font-medium text-terracotta-accent italic">
          Noor
        </span>
      </Link>
    </div>
  )
}
