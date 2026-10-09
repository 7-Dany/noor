import {
  Cta,
  CtaAction,
  CtaContent,
  CtaDescription,
  CtaTitle,
} from "@/components/sections/cta"
import { MaterialGrid } from "@/pages/materials/grid"
import { MaterialsHeading } from "@/pages/materials/heading"

export function MaterialsPage() {
  return (
    <main className="overflow-x-clip px-4 pt-12 pb-18 sm:px-10 sm:pt-14">
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
    </main>
  )
}
