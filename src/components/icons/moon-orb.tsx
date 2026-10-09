import { type ComponentProps } from "react"

import { cn } from "cn"

function MoonOrb({ className, ...props }: ComponentProps<"svg">) {
  return (
    <svg
      data-slot="moon-orb"
      aria-hidden="true"
      viewBox="0 0 240 240"
      className={cn(
        "scale-70 -rotate-40 opacity-0 transition-swap! duration-900! ease-spring! motion-reduce:transition-none! dark:scale-100 dark:rotate-0 dark:opacity-100",
        className
      )}
      {...props}
    >
      <circle cx={127} cy={129} r={62} className="fill-moon-shade" />
      <circle cx={120} cy={120} r={62} className="fill-moon-disc" />
      <g className="fill-moon-crater">
        <circle cx={98} cy={98} r={11} />
        <circle cx={142} cy={140} r={15} />
        <circle cx={100} cy={142} r={7} />
        <circle cx={144} cy={96} r={6} />
        <circle cx={120} cy={120} r={5} />
      </g>
    </svg>
  )
}

export { MoonOrb }
