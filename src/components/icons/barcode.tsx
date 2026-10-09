import { type ComponentProps } from "react"

import { cn } from "cn"

// Decorative barcode. Shared leaf: Receipt and Card both use it.
function Barcode({ className, ...props }: ComponentProps<"svg">) {
  return (
    <svg
      data-slot="barcode"
      aria-hidden="true"
      viewBox="0 0 93 28"
      className={cn("mb-1.5 h-7 w-23 flex-none text-foreground", className)}
      {...props}
    >
      <g fill="currentColor">
        <path d="M0 .121h3V28H0z" />
        <path d="M5 .115h2v27.879H5zm4-.019h4v27.879H9z" opacity=".78" />
        <path d="M15 .089h1v27.879h-1z" />
        <path d="M18 .108h3v27.879h-3zm5-.025h2v27.879h-2z" opacity=".78" />
        <path d="M27 .07h5v27.879h-5z" />
        <path d="M34 .057h2v27.879h-2zm4 .02h3v27.879h-3z" opacity=".78" />
        <path d="M43 .064h1v27.879h-1z" />
        <path d="M46 .051h4V27.93h-4zm6-.006h2v27.879h-2z" opacity=".78" />
        <path d="M56 .038h3v27.879h-3z" />
        <path d="M61 .032h5v27.879h-5zm7-.006h2v27.879h-2z" opacity=".78" />
        <path d="M72 .019h3v27.879h-3z" />
        <path d="M77 .013h1v27.879h-1zm3-.007h4v27.879h-4z" opacity=".78" />
        <path d="M86 0h2v27.879h-2z" />
        <path d="M90 .102h3v27.879h-3z" opacity=".78" />
      </g>
    </svg>
  )
}

export { Barcode }
