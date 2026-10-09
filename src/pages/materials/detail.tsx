import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Heading,
  HeadingEyebrow,
  HeadingLead,
  HeadingTitle,
} from "@/components/sections/heading"
import type { Material } from "@/data/materials"

export function MaterialDetailPage({ material }: { material: Material }) {
  return (
    <main className="px-4 pt-12 pb-18 sm:px-10 sm:pt-14">
      <Heading>
        <HeadingEyebrow>Material · Free for teachers</HeadingEyebrow>
        <HeadingTitle>{material.title}.</HeadingTitle>
        <HeadingLead>{material.summary}</HeadingLead>
      </Heading>
      <Empty className="mx-auto mt-10 max-w-190">
        <EmptyHeader>
          <EmptyTitle>Lessons coming soon</EmptyTitle>
          <EmptyDescription>Check back soon.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    </main>
  )
}
