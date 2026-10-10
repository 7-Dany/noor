import { MaterialsPage } from "@/pages/materials/page"

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
  return <MaterialsPage />
}
