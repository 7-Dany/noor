import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"

export function meta() {
  return [{ title: "Log in · Noor" }]
}

// Placeholder for the auth form.
export default function Login() {
  return (
    <main className="container mx-auto flex min-h-svh max-w-md flex-col justify-center p-6">
      <Empty>
        <EmptyHeader>
          <EmptyTitle>Log in</EmptyTitle>
          <EmptyDescription>The login form is coming soon.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    </main>
  )
}
