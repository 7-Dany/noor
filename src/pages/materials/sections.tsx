import {
  Agenda,
  AgendaIndex,
  AgendaItem,
  AgendaMeta,
  AgendaStatus,
  AgendaTitle,
} from "@/components/custom/agenda"
import {
  Outline,
  OutlineContent,
  OutlineNav,
  OutlineNavIndex,
  OutlineNavItem,
  OutlineNavLabel,
  OutlineNavLink,
  OutlineNavList,
  OutlineSection,
  OutlineSectionDescription,
  OutlineSectionHeader,
  OutlineSectionMeta,
  OutlineSectionTitle,
} from "@/components/custom/outline"
import type { Tone } from "@/components/ui/card"
import type { Section } from "@/data/chapters"
import { pad } from "@/lib/utils"

// Nav on the left, lesson sections on the right. `sections` must be a stable
// reference. `completed` (lesson ids) is passed only when progress tracking
// applies (Premium): without it no status marks or done counts render.
function ChapterSections({
  sections,
  tone,
  completed,
}: {
  sections: readonly Section[]
  tone: Tone
  completed?: readonly string[]
}) {
  return (
    <Outline items={sections} tone={tone}>
      <OutlineNav aria-label="Sections">
        <OutlineNavLabel>In this chapter</OutlineNavLabel>
        <OutlineNavList>
          {sections.map((section, i) => (
            <OutlineNavItem key={section.id}>
              <OutlineNavLink value={section.id}>
                <OutlineNavIndex>{pad(i + 1, sections.length)}</OutlineNavIndex>
                {section.title}
              </OutlineNavLink>
            </OutlineNavItem>
          ))}
        </OutlineNavList>
      </OutlineNav>
      <OutlineContent>
        {sections.map((section) => {
          const count = section.lessons.length
          const doneCount = completed
            ? section.lessons.filter((l) => completed.includes(l.id)).length
            : 0
          return (
            <OutlineSection key={section.id} value={section.id}>
              <OutlineSectionHeader>
                <OutlineSectionTitle>{section.title}</OutlineSectionTitle>
                <OutlineSectionMeta>
                  {completed
                    ? `${doneCount} / ${count}`
                    : `${count} ${count === 1 ? "lesson" : "lessons"}`}
                </OutlineSectionMeta>
              </OutlineSectionHeader>
              <OutlineSectionDescription>
                {section.summary}
              </OutlineSectionDescription>
              <Agenda className="mt-3">
                {section.lessons.map((lesson, j) => (
                  <AgendaItem key={lesson.id}>
                    {completed ? (
                      <AgendaStatus done={completed.includes(lesson.id)} />
                    ) : null}
                    <AgendaIndex>{pad(j + 1, count)}</AgendaIndex>
                    <AgendaTitle>{lesson.title}</AgendaTitle>
                    <AgendaMeta>{lesson.kind}</AgendaMeta>
                  </AgendaItem>
                ))}
              </Agenda>
            </OutlineSection>
          )
        })}
      </OutlineContent>
    </Outline>
  )
}

export { ChapterSections }
