import { type ComponentProps } from "react"

import { cn } from "cn"

// Crescent and two stars. Outline and stars take the text colour (text-moon);
// the body fills from --moon-disc (both set in index.css).
function Moon({ className, ...props }: ComponentProps<"svg">) {
  return (
    <svg
      data-slot="moon"
      aria-hidden="true"
      viewBox="0 0 49 49"
      fill="none"
      className={cn("size-12 text-moon", className)}
      {...props}
    >
      <g strokeWidth="1.837" strokeLinejoin="round" className="stroke-current">
        <path
          className="fill-(--moon-disc)"
          d="M22.72 9.1A15.5 15.5 0 1 0 39.72 27.41 12.5 12.5 0 0 1 22.72 9.1Z"
        />
        <g className="fill-current" stroke="none">
          <circle cx="33.5" cy="14.5" r="1.8" />
          <circle cx="38.5" cy="22" r="1.2" />
        </g>
      </g>
    </svg>
  )
}

export { Moon }
