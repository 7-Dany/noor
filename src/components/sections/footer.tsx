import { Link } from "react-router"

import { cn } from "cn"
import { SunMoon } from "@/components/icons"

const FOOTER_LINKS = [
  { to: "/materials", label: "Materials" },
  { to: "/pricing", label: "Pricing" },
  { to: "/login", label: "Log in" },
] as const

const YEAR = new Date().getFullYear()

function Footer({ className, ...props }: React.ComponentProps<"footer">) {
  return (
    <footer data-slot="footer" className={cn("w-full", className)} {...props}>
      <div className="mt-10 w-full border-t border-border/50 max-sm:mt-6">
        <div className="px-4 sm:px-10">
          <div className="mx-auto flex max-w-280 flex-wrap items-center justify-between gap-x-6 gap-y-4 py-6">
            <div className="flex items-center gap-2.5">
              <SunMoon className="size-7" />
              <span className="font-serif text-wordmark font-medium text-terracotta-accent italic">
                Noor
              </span>
            </div>
            <nav
              aria-label="Footer"
              className="flex items-center gap-5 text-body max-sm:gap-4"
            >
              {FOOTER_LINKS.map((link) => (
                <Link key={link.to} to={link.to} className="hover:underline">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div
        data-slot="footer-copyright"
        className="w-full border-t border-border/50"
      >
        <div className="px-4 sm:px-10">
          <p className="mx-auto max-w-280 py-3 text-center font-mono text-tiny tracking-eyebrow text-muted-foreground uppercase">
            © {YEAR} Noor · Free for teachers
          </p>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
