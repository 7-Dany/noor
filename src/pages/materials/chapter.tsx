import { Link } from "react-router"

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
import type { Chapter } from "@/data/chapters"
import type { Material } from "@/data/materials"
import { SitePage } from "@/components/sections/page"
import { pad } from "@/lib/utils"
import { ChapterSections } from "@/pages/materials/sections"

// `completed` (lesson ids) is passed only when progress tracking applies
// (Premium); see ChapterSections.
function ChapterPage({
  material,
  chapter,
  position,
  total,
  completed,
}: {
  material: Material
  chapter: Chapter
  position: number
  total: number
  completed?: readonly string[]
}) {
  const sections = chapter.sections ?? []

  return (
    <SitePage width="wide">
      <Breadcrumb tone={chapter.tone} className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link to="/materials" />}>
                Materials
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                render={<Link to={`/materials/${material.id}`} />}
              >
                {material.title}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{chapter.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Card tone={chapter.tone} pattern="chapter">
        <CardHeader pattern="chapter">
          <span className="sr-only">
            Chapter {position} of {total}
          </span>
          <span
            aria-hidden="true"
            className="ms-auto text-lg tracking-normal"
          >
            {pad(position, total)}
          </span>
        </CardHeader>
          <CardWatermark pattern="chapter">{chapter.glyph}</CardWatermark>
        <CardTitle pattern="chapter">{chapter.title}</CardTitle>
        <CardDescription pattern="chapter" title={chapter.summary}>
          {chapter.summary}
        </CardDescription>
        <CardStats pattern="chapter">
          <CardStat
            pattern="chapter"
            value={String(chapter.lessons)}
            label="Lessons"
          />
        </CardStats>
        </Card>
        {sections.length > 0 ? (
          <div className="mt-7">
            <ChapterSections
              sections={sections}
              tone={chapter.tone}
              completed={completed}
            />
          </div>
        ) : (
          <Empty className="mt-7">
            <EmptyHeader>
              <EmptyTitle>Sections coming soon</EmptyTitle>
              <EmptyDescription>
                This chapter is being organized.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
    </SitePage>
  )
}

export { ChapterPage }
