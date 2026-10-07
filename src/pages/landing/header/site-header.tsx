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

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
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
              className="flex h-9.5 items-center rounded-lg px-3 text-body font-medium text-foreground transition-colors hover:text-terracotta hover:underline hover:decoration-terracotta hover:underline-offset-5"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto hidden items-center gap-2.5 md:flex">
          <a
            href="#pricing"
            className={buttonVariants({ variant: "outline", size: "pill" })}
          >
            Log in
          </a>
          <a
            href="#pricing"
            className={buttonVariants({ variant: "default", size: "pill" })}
          >
            Start free
            <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
          </a>
        </div>
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger
            render={
              <Button
                variant="outline"
                size="icon-lg"
                aria-label="Open menu"
                className="ml-auto md:hidden"
              />
            }
          >
            <HugeiconsIcon icon={Menu01Icon} size={20} />
          </SheetTrigger>
          <SheetContent
            side="left"
            showCloseButton={false}
            className="w-full max-w-xs"
          >
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <div className="flex h-full flex-col bg-background px-4">
              <div className="flex items-center justify-between py-3">
                <Wordmark />
                <SheetClose
                  render={
                    <Button
                      variant="outline"
                      size="icon-lg"
                      aria-label="Close menu"
                    />
                  }
                >
                  <HugeiconsIcon icon={Cancel01Icon} size={18} />
                </SheetClose>
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
                  onClick={closeMenu}
                  className={buttonVariants({
                    variant: "outline",
                    size: "pill-lg",
                  })}
                >
                  Log in
                </a>
                <a
                  href="#pricing"
                  onClick={closeMenu}
                  className={buttonVariants({
                    variant: "default",
                    size: "pill-lg",
                  })}
                >
                  Start free
                </a>
                <p className="pt-2 text-center font-mono text-micro tracking-widest text-muted-foreground uppercase">
                  © {new Date().getFullYear()} Noor · Free for teachers
                </p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
