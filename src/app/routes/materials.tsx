import { SiteCta } from "@/components/sections/site-cta"
import { MaterialGrid } from "@/pages/materials/material-grid"
import { MaterialsHeading } from "@/pages/materials/materials-heading"

export function meta() {
  return [
    { title: "Materials · Noor" },
    {
      name: "description",
      content:
        "Choose a material: Noor Al-Bayan, Tajweed Mastery, Vocab & Grammar and the Quran Library. Free for teachers.",
    },
  ]
}

export default function Materials() {
  return (
    <main className="overflow-x-clip px-4 pt-12 pb-18 sm:px-10 sm:pt-14">
      <MaterialsHeading />
      <MaterialGrid />
      <SiteCta className="mt-18" />
    </main>
  )
}
