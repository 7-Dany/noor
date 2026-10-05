import { SiteHeader } from "@/components/landing/site-header/site-header"
import { HeroHeading } from "@/components/landing/hero/hero-heading"
import { MaterialStack } from "@/components/landing/hero/material-stack"

export function meta() {
  return [{ title: "Noor · Free teaching material for Arabic & Quran" }]
}

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="px-4 pt-12 sm:px-10 sm:pt-14">
        <HeroHeading />
        <MaterialStack />
      </main>
    </>
  )
}
