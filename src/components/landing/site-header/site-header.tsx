import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight01Icon,
  BookOpen01Icon,
  Cancel01Icon,
  HelpCircleIcon,
  Menu01Icon,
  Tag01Icon,
} from "@hugeicons/core-free-icons"

import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet"
import { Wordmark } from "./wordmark"

const NAV_LINKS = [
  { href: "#materials", label: "Materials", icon: BookOpen01Icon },
  { href: "#why", label: "Why Noor", icon: HelpCircleIcon },
  { href: "#pricing", label: "Pricing", icon: Tag01Icon },
] as const

/**
 * Landing header. Sticky translucent bar: brand left, quiet nav with
 * terracotta hover, outline Log in + solid Start free pills right.
 * Mobile collapses to a burger opening a sheet menu.
 */
export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)
  return (
    <header
      data-slot="site-header"
      className="sticky top-0 z-40 border-b border-border bg-background/88 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-295 items-center gap-7 px-4 py-2.5 sm:px-10">
        <Wordmark />
        <nav
          data-slot="site-header-nav"
          aria-label="Primary"
          className="ml-3 hidden items-center gap-1 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="flex h-9.5 items-center rounded-lg px-3 text-body font-medium text-foreground transition-colors hover:text-terra hover:underline hover:decoration-terra hover:underline-offset-5"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto hidden items-center gap-2.5 md:flex">
          <a
            href="#pricing"
            className="flex h-9.5 items-center rounded-full border border-border bg-card px-4 text-sm font-medium transition-colors hover:bg-muted"
          >
            Log in
          </a>
          <a
            href="#pricing"
            className="flex h-9.5 items-center gap-1.5 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
          >
            Start free
            <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
          </a>
        </div>
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <button
            type="button"
            data-slot="site-header-menu"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="ml-auto grid size-9.5 place-items-center rounded-lg border border-border bg-card md:hidden"
          >
            <HugeiconsIcon icon={Menu01Icon} size={20} />
          </button>
          <SheetContent
            side="left"
            showCloseButton={false}
            className="w-full max-w-xs"
          >
            <div className="flex h-full flex-col bg-background px-4">
            <div className="flex items-center justify-between py-3">
              <Wordmark />
              <button
                type="button"
                aria-label="Close menu"
                onClick={closeMenu}
                className="grid size-9 place-items-center rounded-lg border border-border bg-card transition-colors hover:bg-muted"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={18} />
              </button>
            </div>
            <nav aria-label="Menu" className="mt-4 grid gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="flex h-12 items-center gap-3 rounded-xl px-3 text-body font-medium transition-colors hover:bg-card"
                >
                  <HugeiconsIcon
                    icon={link.icon}
                    size={20}
                    className="text-muted-foreground"
                  />
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-auto grid gap-2.5 pb-4">
              <a
                href="#pricing"
                className="flex h-12 items-center justify-center rounded-full border border-border bg-card text-sm font-medium"
              >
                Log in
              </a>
              <a
                href="#pricing"
                className="flex h-12 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground"
              >
                Start free
              </a>
              <p className="pt-2 text-center font-mono text-micro tracking-widest text-muted-foreground uppercase">
                © 2026 Noor · Free for teachers
              </p>
            </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
