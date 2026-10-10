import { Link } from "react-router"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { SitePage } from "@/components/sections/page"
import { LETTERS } from "@/data/letters"
import { LetterDeck } from "@/pages/letters/deck"

export function LettersPage() {
  return (
    <SitePage width="wide" clip>
      <Breadcrumb tone="terracotta">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link to="/materials" />}>
              Materials
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link to="/materials/noor-al-bayan" />}>
              Noor Al-Bayan
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Letters</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="sr-only">Letters</h1>
      <LetterDeck items={LETTERS} className="mt-10" />
    </SitePage>
  )
}
