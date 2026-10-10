import { useLoaderData } from "react-router"

import { MATERIALS } from "@/data/materials"
import { MaterialDetailPage } from "@/pages/materials/detail"
import type { Route } from "./+types/material-detail"

export async function loader({ params }: Route.LoaderArgs) {
  const material = MATERIALS.find((m) => m.id === params.id)
  if (!material) {
    throw new Response("Not Found", {
      status: 404,
      statusText: "Material not found",
    })
  }
  return material
}

export function meta({ loaderData }: Route.MetaArgs) {
  return loaderData
    ? [
        { title: `${loaderData.title} · Noor` },
        { name: "description", content: loaderData.summary },
      ]
    : [{ title: "Not found · Noor" }]
}

export default function MaterialDetail() {
  const material = useLoaderData<typeof loader>()
  return <MaterialDetailPage material={material} />
}
