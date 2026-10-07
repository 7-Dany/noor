import { SiteCta } from "@/components/sections/site-cta"
import { HeroHeading } from "@/pages/landing/hero/hero-heading"
import { MaterialStack } from "@/pages/landing/material-stack/material-stack"

export function meta() {
  return [
    { title: "Noor · Free teaching material for Arabic & Quran" },
    {
      name: "description",
      content:
        "Slides, lessons and reading passages for Noor Al-Bayan, tajweed, vocabulary and the Quran. Free for teachers.",
    },
  ]
}

export default function Home() {
  return (
    <main className="overflow-x-clip px-4 pt-12 pb-18 sm:px-10 sm:pt-14">
      <HeroHeading />
      <MaterialStack />
      <SiteCta className="mt-18" />
    </main>
  )
}
