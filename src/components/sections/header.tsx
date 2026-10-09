import { useState } from "react"
import { Link, NavLink } from "react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight01Icon,
  BookOpen01Icon,
  Cancel01Icon,
  Home01Icon,
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

// Pages only: the header navigates between routes, never to page sections.
const NAV_LINKS = [
  { to: "/", label: "Home", icon: Home01Icon },
  { to: "/materials", label: "Materials", icon: BookOpen01Icon },
  { to: "/pricing", label: "Pricing", icon: Tag01Icon },
] as const

const YEAR = new Date().getFullYear()

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)
  return (
    <header
      data-slot="header"
      className="sticky top-0 z-40 border-b border-border/50 bg-background/88 backdrop-blur-md"
    >
      <div className="relative mx-auto flex max-w-295 items-center gap-7 px-4 py-2.5 sm:px-10">
        <Wordmark />
        <nav
          data-slot="header-nav"
          aria-label="Primary"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end
              className="flex h-9.5 items-center rounded-lg px-3 text-body font-medium text-foreground transition-colors hover:text-terracotta hover:underline hover:decoration-terracotta hover:underline-offset-5 aria-[current=page]:text-terracotta-accent aria-[current=page]:underline aria-[current=page]:decoration-terracotta aria-[current=page]:underline-offset-5"
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto hidden items-center gap-2.5 md:flex">
          <Link
            to="/login"
            className={buttonVariants({ variant: "outline", size: "pill" })}
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className={buttonVariants({ variant: "default", size: "pill" })}
          >
            Start free
            <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
          </Link>
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
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end
                    onClick={closeMenu}
                    className="flex h-12 items-center gap-3 rounded-xl px-3 text-body font-medium transition-colors hover:bg-card aria-[current=page]:bg-card aria-[current=page]:text-terracotta"
                  >
                    <HugeiconsIcon
                      icon={link.icon}
                      size={20}
                      className="text-muted-foreground"
                    />
                    {link.label}
                  </NavLink>
                ))}
              </nav>
              <div className="mt-auto grid gap-2.5 pb-4">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className={buttonVariants({
                    variant: "outline",
                    size: "pill-lg",
                  })}
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  onClick={closeMenu}
                  className={buttonVariants({
                    variant: "default",
                    size: "pill-lg",
                  })}
                >
                  Start free
                </Link>
                <p className="pt-2 text-center font-mono text-micro tracking-widest text-muted-foreground uppercase">
                  © {YEAR} Noor · Free for teachers
                </p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
