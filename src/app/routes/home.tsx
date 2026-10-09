import { LandingPage } from "@/pages/landing/page"

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
  return <LandingPage />
}
