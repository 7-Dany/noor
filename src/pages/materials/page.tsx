import {
  Cta,
  CtaAction,
  CtaContent,
  CtaDescription,
  CtaTitle,
} from "@/components/sections/cta"
import { SitePage } from "@/components/sections/page"
import { MaterialGrid } from "@/pages/materials/grid"
import { MaterialsHeading } from "@/pages/materials/heading"

export function MaterialsPage() {
  return (
    <SitePage clip>
      <MaterialsHeading />
      <MaterialGrid />
      <Cta className="mt-18">
        <CtaContent>
          <CtaTitle>Ready for more than lessons?</CtaTitle>
          <CtaDescription>
            Premium adds games, quizzes, notes and progress tracking.
          </CtaDescription>
        </CtaContent>
        <CtaAction to="/pricing">See Premium</CtaAction>
      </Cta>
    </SitePage>
  )
}
