import { LettersPage } from "@/pages/letters/page"

export function meta() {
  return [
    { title: "Letters · Noor Al-Bayan" },
    {
      name: "description",
      content: "The alphabet first: names, shapes, and sounds.",
    },
  ]
}

export default function Letters() {
  return <LettersPage />
}
