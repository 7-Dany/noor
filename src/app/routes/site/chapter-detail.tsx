import { useLoaderData } from "react-router"

import { getChapters } from "@/data/chapters"
import { MATERIALS } from "@/data/materials"
import { ChapterPage } from "@/pages/materials/chapter"
import type { Route } from "./+types/chapter-detail"

export async function loader({ params }: Route.LoaderArgs) {
  const material = MATERIALS.find((m) => m.id === params.id)
  const chapters = getChapters(params.id)
  const index = chapters.findIndex((c) => c.id === params.chapterId)
  if (!material || index === -1) {
    throw new Response("Not Found", {
      status: 404,
      statusText: "Chapter not found",
    })
  }
  return {
    material,
    chapter: chapters[index],
    position: index + 1,
    total: chapters.length,
  }
}

export function meta({ loaderData }: Route.MetaArgs) {
  return loaderData
    ? [
        {
          title: `${loaderData.chapter.title} · ${loaderData.material.title} · Noor`,
        },
        { name: "description", content: loaderData.chapter.summary },
      ]
    : [{ title: "Not found · Noor" }]
}

export default function ChapterDetail() {
  const data = useLoaderData<typeof loader>()
  return <ChapterPage {...data} />
}
