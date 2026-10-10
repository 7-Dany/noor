import { data, Link } from "react-router"

import { buttonVariants } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"

export function meta() {
  return [{ title: "Page not found" }]
}

// The splat route matches every unknown URL, so it must say 404 itself.
export function loader() {
  return data(null, { status: 404 })
}

export default function NotFound() {
  return (
    <main className="container mx-auto flex min-h-svh max-w-md flex-col justify-center p-6">
      <Empty>
        <EmptyHeader>
          <EmptyTitle>Page not found</EmptyTitle>
          <EmptyDescription>
            The page you are looking for does not exist or has moved.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Link to="/" className={buttonVariants()}>
            Back to home
          </Link>
        </EmptyContent>
      </Empty>
    </main>
  )
}
