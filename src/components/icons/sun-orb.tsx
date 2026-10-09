import { type ComponentProps } from "react"

import { cn } from "cn"

const RAYS = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]

function SunOrb({ className, ...props }: ComponentProps<"svg">) {
  return (
    <svg
      data-slot="sun-orb"
      aria-hidden="true"
      viewBox="0 0 240 240"
      className={cn(
        "transition-swap! duration-900! ease-spring! motion-reduce:transition-none! dark:scale-70 dark:rotate-40 dark:opacity-0",
        className
      )}
      {...props}
    >
      <g strokeWidth={9} strokeLinecap="round" className="stroke-sun-deep">
        {RAYS.map((angle) => (
          <line
            key={angle}
            x1={120}
            y1={14}
            x2={120}
            y2={38}
            transform={`rotate(${angle} 120 120)`}
          />
        ))}
      </g>
      <circle cx={127} cy={129} r={62} className="fill-sun-shade" />
      <circle cx={120} cy={120} r={62} className="fill-sun-disc" />
    </svg>
  )
}

export { SunOrb }
