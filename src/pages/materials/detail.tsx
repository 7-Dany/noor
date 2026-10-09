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
  CardFooter,
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
              <Card key={chapter.id} tone={chapter.tone} pattern="chapter">
                <CardHeader pattern="chapter">
                  <span
                    aria-hidden="true"
                    className="font-serif text-3xl leading-none"
                  >
                    {pad(i + 1, chapters.length)}
                  </span>
                  <span className="sr-only">
                    Chapter {i + 1} of {chapters.length}
                  </span>
                </CardHeader>
                <CardWatermark pattern="chapter">{chapter.glyph}</CardWatermark>
                <CardTitle pattern="chapter">{chapter.title}</CardTitle>
                <CardDescription pattern="chapter">
                  {chapter.summary}
                </CardDescription>
                <CardFooter pattern="chapter">
                  {chapter.lessons} lessons
                </CardFooter>
              </Card>
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
