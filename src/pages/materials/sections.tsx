import { useRef } from "react"
import { Link } from "react-router"

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
// Shared section links, rendered twice: the sticky desktop rail and the
// collapsed phone disclosure. Closes the disclosure on jump.
function SectionLinks({
  sections,
  onNavigate,
}: {
  sections: readonly Section[]
  onNavigate?: () => void
}) {
  return (
    <OutlineNavList>
      {sections.map((section, i) => (
        <OutlineNavItem key={section.id}>
          <OutlineNavLink value={section.id} onClick={onNavigate}>
            <OutlineNavIndex>{pad(i + 1, sections.length)}</OutlineNavIndex>
            {section.title}
          </OutlineNavLink>
        </OutlineNavItem>
      ))}
    </OutlineNavList>
  )
}

function ChapterSections({
  sections,
  tone,
  completed,
}: {
  sections: readonly Section[]
  tone: Tone
  completed?: readonly string[]
}) {
  const tocRef = useRef<HTMLDetailsElement>(null)
  const closeToc = () => tocRef.current?.removeAttribute("open")
  const total = sections.reduce((n, section) => n + section.lessons.length, 0)

  return (
    <Outline items={sections} tone={tone}>
      <details
        ref={tocRef}
        data-slot="outline-toc"
        className="rounded-xl border bg-card px-4 py-3 md:hidden"
      >
        <summary className="cursor-pointer font-mono text-(length:--text-tiny) tracking-normal text-muted-foreground normal-case">
          In this chapter · {sections.length} sections
        </summary>
        <div className="pt-2">
          <SectionLinks sections={sections} onNavigate={closeToc} />
        </div>
      </details>
      <OutlineNav aria-label="In this chapter" className="hidden md:block">
        <div className="flex items-baseline justify-between gap-3 px-3.5 pb-2">
          <OutlineNavLabel className="px-0 pb-0 tracking-normal normal-case">
            In this chapter
          </OutlineNavLabel>
          <span className="font-mono text-(length:--text-tiny) text-muted-foreground normal-case">
            {total} lessons
          </span>
        </div>
        <SectionLinks sections={sections} />
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
                <OutlineSectionMeta className="tracking-normal normal-case">
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
                    <AgendaTitle>
                      {lesson.to ? (
                        <Link
                          to={lesson.to}
                          className="hover:underline hover:underline-offset-4"
                        >
                          {lesson.title}
                        </Link>
                      ) : (
                        lesson.title
                      )}
                    </AgendaTitle>
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
