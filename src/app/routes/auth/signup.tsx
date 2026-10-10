import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"

export function meta() {
  return [{ title: "Start free · Noor" }]
}

// Placeholder for the auth form.
export default function Signup() {
  return (
    <main className="container mx-auto flex min-h-svh max-w-md flex-col justify-center p-6">
      <Empty>
        <EmptyHeader>
          <EmptyTitle>Start free</EmptyTitle>
          <EmptyDescription>The sign-up form is coming soon.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    </main>
  )
}
