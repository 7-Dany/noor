import { type ComponentProps } from "react"

import { cn } from "cn"

/* Agenda: ruled rows, one entry each. Plain HTML only. Reads --tone from the
   nearest `tone-*` ancestor. Status marks progress: leave AgendaStatus out
   when nothing is tracked.

   Agenda → AgendaItem × n
     → AgendaStatus? + AgendaIndex + AgendaTitle + AgendaMeta */

function Agenda({ className, ...props }: ComponentProps<"ul">) {
  return (
    <ul
      data-slot="agenda"
      className={cn("flex flex-col", className)}
      {...props}
    />
  )
}

function AgendaItem({ className, ...props }: ComponentProps<"li">) {
  return (
    <li
      data-slot="agenda-item"
      className={cn(
        "flex items-center gap-3.5 border-b px-1 py-2.5 text-(length:--text-body)",
        className
      )}
      {...props}
    />
  )
}

function AgendaStatus({
  done = false,
  className,
  ...props
}: Omit<ComponentProps<"span">, "children"> & { done?: boolean }) {
  return (
    <span
      data-slot="agenda-status"
      data-done={done ? "" : undefined}
      className={cn(
        "grid size-4.5 shrink-0 place-items-center rounded-full border text-(length:--text-micro)",
        done
          ? "border-(--tone) bg-(--tone) text-tone-foreground"
          : "border-muted-foreground/50 text-transparent",
        className
      )}
      {...props}
    >
      {done ? <span aria-hidden="true">✓</span> : null}
      <span className="sr-only">{done ? "Completed" : "Not completed"}</span>
    </span>
  )
}

function AgendaIndex({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="agenda-index"
      className={cn(
        "w-7 shrink-0 font-mono text-(length:--text-caption) text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function AgendaTitle({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="agenda-title"
      className={cn("flex-1", className)}
      {...props}
    />
  )
}

function AgendaMeta({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="agenda-meta"
      className={cn("text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Agenda,
  AgendaItem,
  AgendaStatus,
  AgendaIndex,
  AgendaTitle,
  AgendaMeta,
}
