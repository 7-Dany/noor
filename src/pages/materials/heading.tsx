import {
  Heading,
  HeadingAccent,
  HeadingEyebrow,
  HeadingLead,
  HeadingTitle,
} from "@/components/sections/heading"

export function MaterialsHeading() {
  return (
    <Heading data-slot="materials-heading">
      <HeadingEyebrow>
        Free for teachers · Arabic reading &amp; Quran
      </HeadingEyebrow>
      <HeadingTitle>
        Choose a <HeadingAccent>material.</HeadingAccent>
      </HeadingTitle>
      <HeadingLead>
        Every one is free to use in class. Pick a material and start from any
        lesson.
      </HeadingLead>
    </Heading>
  )
}
