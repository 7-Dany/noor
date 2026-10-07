import { Button } from "@/components/ui/button"
import { SunMoon } from "@/components/icons/sun-moon"
import {
  MaterialCard,
  MaterialCardFooter,
  MaterialCardHeader,
  MaterialCardNote,
  MaterialCardStat,
  MaterialCardStats,
  MaterialCardSummary,
  MaterialCardTitle,
  MaterialCardWatermark,
} from "@/components/custom/material-card"
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
        <MaterialCard key={material.id} tone={material.tone}>
          <MaterialCardHeader>
            <span>
              Material {i + 1} of {MATERIALS.length}
            </span>
            <SunMoon className="size-7.5" />
          </MaterialCardHeader>
          <MaterialCardWatermark>{material.watermark}</MaterialCardWatermark>
          <MaterialCardNote>{material.note}</MaterialCardNote>
          <MaterialCardTitle>{material.title}.</MaterialCardTitle>
          <MaterialCardSummary>{material.summary}</MaterialCardSummary>
          <MaterialCardStats>
            {material.stats.map((stat) => (
              <MaterialCardStat
                key={stat.label}
                value={stat.value}
                label={stat.label}
              />
            ))}
          </MaterialCardStats>
          <MaterialCardFooter>
            {/* No material routes yet, so this is a plain button for now. */}
            <Button variant="tone" size="pill" disabled={material.disabled}>
              {material.cta}
            </Button>
          </MaterialCardFooter>
        </MaterialCard>
      ))}
    </section>
  )
}

export { MaterialGrid }
