import { Link } from "react-router"

import { buttonVariants } from "@/components/ui/button"
import { SunMoon } from "@/components/icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardNote,
  CardStat,
  CardStats,
  CardTitle,
  CardWatermark,
} from "@/components/ui/card"
import { MATERIALS } from "@/data/materials"

// Two columns from md, one column below.
function MaterialGrid() {
  return (
    <section
      data-slot="material-grid"
      aria-label="Materials"
      className="mx-auto mt-10 grid w-full max-w-280 gap-6 md:grid-cols-2"
    >
      {MATERIALS.map((material, i) => (
        <Card key={material.id} tone={material.tone} pattern="material">
          <CardHeader pattern="material">
            <span>
              Material {i + 1} of {MATERIALS.length}
            </span>
            <SunMoon className="size-7.5" />
          </CardHeader>
          <CardWatermark>{material.watermark}</CardWatermark>
          <CardNote>{material.note}</CardNote>
          <CardTitle pattern="material">{material.title}.</CardTitle>
          <CardDescription pattern="material">
            {material.summary}
          </CardDescription>
          <CardStats>
            {material.stats.map((stat) => (
              <CardStat
                key={stat.label}
                value={stat.value}
                label={stat.label}
              />
            ))}
          </CardStats>
          <CardFooter pattern="material">
            <Link
              to={`/materials/${material.id}`}
              className={buttonVariants({ variant: "tone", size: "pill" })}
            >
              {material.cta}
              <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
            </Link>
          </CardFooter>
        </Card>
      ))}
    </section>
  )
}

export { MaterialGrid }
