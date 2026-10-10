import { Link } from "react-router"

import { SunMoon } from "@/components/icons"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Card,
  CardDescription,
  CardHeader,
  CardNote,
  CardStat,
  CardStats,
  CardTitle,
  CardWatermark,
} from "@/components/ui/card"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import { getChapters } from "@/data/chapters"
import { MATERIALS, type Material } from "@/data/materials"
import { pad } from "@/lib/utils"

// Same material card as the grid, full width and shorter, with no action.
function MaterialDetailPage({ material }: { material: Material }) {
  const position = MATERIALS.findIndex((m) => m.id === material.id) + 1
  const chapters = getChapters(material.id)

  return (
    <main className="px-4 pt-12 pb-18 sm:px-10 sm:pt-14">
      <div className="mx-auto w-full max-w-280">
        <Breadcrumb tone={material.tone} className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link to="/materials" />}>
                Materials
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{material.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Card tone={material.tone} pattern="material" size="sm">
          <CardHeader pattern="material">
            <span>
              Material {position} of {MATERIALS.length}
            </span>
            <SunMoon className="size-7.5" />
          </CardHeader>
          <CardWatermark>{material.watermark}</CardWatermark>
          <CardNote>{material.note}</CardNote>
          <CardTitle pattern="material">{material.title}.</CardTitle>
          <CardDescription pattern="material">
            {material.summary}
          </CardDescription>
          <CardStats>
            {material.stats.map((stat) => (
              <CardStat
                key={stat.label}
                value={stat.value}
                label={stat.label}
              />
            ))}
          </CardStats>
        </Card>
        {chapters.length > 0 ? (
          <section
            data-slot="chapter-grid"
            aria-label="Chapters"
            className="mt-10 grid gap-4 md:grid-cols-2"
          >
            {chapters.map((chapter, i) => (
              <Link
                key={chapter.id}
                to={`/materials/${material.id}/${chapter.id}`}
                className="block rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <Card tone={chapter.tone} pattern="chapter" className="h-full">
                  <CardHeader pattern="chapter">
                    <span className="sr-only">
                      Chapter {i + 1} of {chapters.length}
                    </span>
                    <span aria-hidden="true">
                      {pad(i + 1, chapters.length)}
                    </span>
                    <span>{chapter.lessons} lessons</span>
                  </CardHeader>
                  <CardWatermark pattern="chapter">
                    {chapter.glyph}
                  </CardWatermark>
                  <CardTitle pattern="chapter">{chapter.title}</CardTitle>
                  <CardDescription pattern="chapter">
                    {chapter.summary}
                  </CardDescription>
                </Card>
              </Link>
            ))}
          </section>
        ) : (
          <Empty className="mt-10">
            <EmptyHeader>
              <EmptyTitle>Lessons coming soon</EmptyTitle>
              <EmptyDescription>Check back soon.</EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      </div>
    </main>
  )
}

export { MaterialDetailPage }
