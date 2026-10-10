import {
  Cta,
  CtaAction,
  CtaContent,
  CtaDescription,
  CtaTitle,
} from "@/components/sections/cta"
import { SitePage } from "@/components/sections/page"
import { MATERIALS } from "@/data/materials"
import { HeroHeading } from "@/pages/landing/heading"
import { Stack } from "@/pages/landing/stack"

export function LandingPage() {
  return (
    <SitePage clip>
      <HeroHeading />
      <Stack items={MATERIALS} />
      <Cta className="mt-18">
        <CtaContent>
          <CtaTitle>Ready for your next class?</CtaTitle>
          <CtaDescription>
            Open a lesson and start teaching in a minute.
          </CtaDescription>
        </CtaContent>
        <CtaAction to="/materials">Start teaching free</CtaAction>
      </Cta>
    </SitePage>
  )
}
