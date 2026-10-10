import type { ReactNode } from "react"

import { cn } from "cn"

// Shared site page shell: gutters, top/bottom rhythm, optional centered
// column. `width` wraps children in the wide reading column (detail pages);
// omit it when children manage their own widths (landing, pricing).
// `clip` contains horizontal overflow (fanned decks); `bottom="roomy"`
// adds extra clearance above the footer.
function SitePage({
  children,
  className,
  clip,
  bottom = "default",
  width,
}: {
  children: ReactNode
  className?: string
  clip?: boolean
  bottom?: "default" | "roomy"
  width?: "wide"
}) {
  return (
    <main
      className={cn(
        "px-4 pt-12 sm:px-10 sm:pt-14",
        bottom === "roomy" ? "pb-20" : "pb-18",
        clip && "overflow-x-clip",
        className
      )}
    >
      {width === "wide" ? (
        <div className="mx-auto w-full max-w-280">{children}</div>
      ) : (
        children
      )}
    </main>
  )
}

export { SitePage }
