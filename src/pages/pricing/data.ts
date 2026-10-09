import type { Tone } from "@/components/ui/card"

export type Plan = {
  id: string
  tone: Tone
  title: string
  kicker?: string // omit to show the SunMoon mark instead
  description: string
  features: string[]
  price: string
  unit?: string
  cta: string
}

// Stable reference, like MATERIALS.
export const PLANS: readonly Plan[] = [
  {
    id: "free",
    tone: "ink",
    title: "Free",
    kicker: "Free to teach",
    description: "For every teacher",
    features: [
      "Slides, lessons and reading passages",
      "Open any material and project it in class",
      "Free for teachers",
    ],
    price: "$0",
    cta: "Start free",
  },
  {
    id: "premium",
    tone: "terracotta",
    title: "Premium",
    description: "Everything in Free, for teachers who want more",
    features: [
      "All kinds of games",
      "Fast access to new material",
      "Progress tracking on every material",
      "Quizzes and notes",
      "More as we add it",
    ],
    price: "$5",
    unit: "USD / month",
    cta: "Go Premium",
  },
]
