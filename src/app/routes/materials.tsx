import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"

export function meta() {
  return [{ title: "Materials · Noor" }]
}

// Placeholder until the MaterialCard grid is built (checklist step 2).
export default function Materials() {
  return (
    <main className="px-4 pt-12 sm:px-10 sm:pt-14">
      <Empty>
        <EmptyHeader>
          <EmptyTitle>Materials</EmptyTitle>
          <EmptyDescription>
            The material catalog is coming next.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </main>
  )
}
