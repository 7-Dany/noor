import { type ComponentProps } from "react"

import { cn } from "cn"

// Rays take the text colour; the disc fills from --sun-disc (set in index.css).
function Sun({ className, ...props }: ComponentProps<"svg">) {
  return (
    <svg
      data-slot="sun"
      aria-hidden="true"
      viewBox="0 0 49 49"
      fill="none"
      className={cn("size-12 text-sun", className)}
      {...props}
    >
      <g strokeWidth="1.837" className="stroke-current">
        <path
          className="fill-sun-disc"
          d="M24.5 33.074a8.575 8.575 0 1 0 0-17.149 8.575 8.575 0 0 0 0 17.15Z"
        />
        <path
          strokeLinecap="round"
          d="M37.975 24.5H44.1m-10.072 9.528 4.331 4.331M24.5 37.975V44.1m-9.529-10.072-4.33 4.331m.384-13.859H4.9m10.071-9.528-4.33-4.331m13.859.384V4.9m9.528 10.072 4.331-4.331"
        />
      </g>
    </svg>
  )
}

export { Sun }
