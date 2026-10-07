import { Link } from "react-router"

import { cn } from "cn"
import { buttonVariants } from "@/components/ui/button"

/* SiteCta: the sun-yellow band from the mockup: headline, lead, and a
   foreground pill, with the 240px sun/moon orb scene behind. The sun and moon
   swap with a rotate + scale + fade (the mockup's .orb.s / .orb.m). Shade
   discs and craters are color-mix tints of the disc colour, as in the mockup.
   The `!` suffixes keep the swap running while theme-store.ts freezes other
   transitions. */

const RAYS = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]

function SunOrb({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      data-slot="site-cta-sun"
      aria-hidden="true"
      viewBox="0 0 240 240"
      className={cn(
        "transition-swap! duration-900! ease-spring! motion-reduce:transition-none! dark:scale-70 dark:rotate-40 dark:opacity-0",
        className
      )}
      {...props}
    >
      <g strokeWidth={9} strokeLinecap="round" className="stroke-(--sun-deep)">
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
      <circle
        cx={127}
        cy={129}
        r={62}
        className="fill-[color-mix(in_oklab,var(--sun-disc)_70%,#b86b00)]"
      />
      <circle cx={120} cy={120} r={62} className="fill-(--sun-disc)" />
    </svg>
  )
}

function MoonOrb({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      data-slot="site-cta-moon"
      aria-hidden="true"
      viewBox="0 0 240 240"
      className={cn(
        "-rotate-40 scale-70 opacity-0 transition-swap! duration-900! ease-spring! motion-reduce:transition-none! dark:rotate-0 dark:scale-100 dark:opacity-100",
        className
      )}
      {...props}
    >
      <circle
        cx={127}
        cy={129}
        r={62}
        className="fill-[color-mix(in_oklab,var(--moon-disc)_75%,#000)]"
      />
      <circle cx={120} cy={120} r={62} className="fill-(--moon-disc)" />
      <g className="fill-[color-mix(in_oklab,var(--moon-disc)_78%,#000)]">
        <circle cx={98} cy={98} r={11} />
        <circle cx={142} cy={140} r={15} />
        <circle cx={100} cy={142} r={7} />
        <circle cx={144} cy={96} r={6} />
        <circle cx={120} cy={120} r={5} />
      </g>
    </svg>
  )
}

function SiteCta({ className, ...props }: React.ComponentProps<"section">) {
  return (
    <section
      data-slot="site-cta"
      className={cn(
        "relative mx-auto flex w-full max-w-280 flex-wrap items-center justify-between gap-6 overflow-hidden rounded-[calc(var(--radius)+6px)] bg-cta px-6 py-8 text-cta-foreground sm:px-10 sm:py-9",
        className
      )}
      {...props}
    >
      <SunOrb className="pointer-events-none absolute -top-27.5 -right-25 size-60 max-sm:-top-24 max-sm:-right-18 max-sm:size-52" />
      <MoonOrb className="pointer-events-none absolute -top-27.5 -right-25 size-60 max-sm:-top-24 max-sm:-right-18 max-sm:size-52" />
      <div className="relative max-sm:pr-20">
        <h2 className="font-serif text-[clamp(1.6rem,3vw,2.1rem)] leading-[1.15] font-normal">
          Ready for your next class?
        </h2>
        <p className="mt-1 opacity-85">
          Open a lesson and start teaching in a minute.
        </p>
      </div>
      <Link
        to="/materials"
        className={buttonVariants({
          size: "pill",
          className: "relative mr-30 h-10 px-5 max-[700px]:mr-0",
        })}
      >
        Start teaching free
      </Link>
    </section>
  )
}

export { SiteCta }
