import { Link } from "react-router"

import { LogoMark } from "./logo-mark"

export function Wordmark() {
  return (
    <Link
      to="/"
      data-slot="site-header-brand"
      className="group flex items-center gap-2"
      aria-label="Noor home"
    >
      <LogoMark className="h-10.5 w-8.5 transition-transform duration-500 motion-reduce:transition-none group-hover:rotate-90" />
      <span className="font-serif text-2xl font-medium text-terracotta italic">
        Noor
      </span>
    </Link>
  )
}
