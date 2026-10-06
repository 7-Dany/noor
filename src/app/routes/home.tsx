import { SiteHeader } from "@/pages/landing/header/site-header"
import { HeroHeading } from "@/pages/landing/hero/hero-heading"
import { MaterialStack } from "@/pages/landing/material-stack/material-stack"

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
