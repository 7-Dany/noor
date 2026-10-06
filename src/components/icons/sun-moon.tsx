import { type ComponentProps } from "react"

import { cn } from "cn"
import { Moon } from "@/components/icons/moon"
import { Sun } from "@/components/icons/sun"

// Sun in light mode, moon in dark. Both are always rendered and the `.dark`
// class on <html> picks one, so server and client markup match. Size it and
// position it through className, like Sun.
//
// The theme switch freezes every transition for a moment (theme-store.ts), so
// the swap transition is marked important (the `!` suffixes) to run anyway.
function SunMoon({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="sun-moon"
      aria-hidden="true"
      className={cn("relative inline-block size-12", className)}
      {...props}
    >
      <Sun className="absolute inset-0 size-full transition-swap! duration-500! ease-spring! motion-reduce:transition-none! dark:scale-40 dark:rotate-90 dark:opacity-0" />
      <Moon className="absolute inset-0 size-full scale-40 -rotate-90 opacity-0 transition-swap! duration-500! ease-spring! motion-reduce:transition-none! dark:scale-100 dark:rotate-0 dark:opacity-100" />
    </span>
  )
}

export { SunMoon }
