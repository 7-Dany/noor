import { Link } from "react-router"

import { cn } from "cn"
import { SunMoon } from "@/components/icons/sun-moon"

/* SiteFooter: brand lockup and page nav on one row, then the copyright line
   as its own slim section at the very bottom. Both sections run the full
   width of the page (the divider lines are edge to edge); their content is
   inset like the page <main> (px-4 / sm:px-10, max-w-280) so it lines up
   with the CTA band above. The lockup is static on purpose: unlike the
   header Wordmark, the footer carries no theme toggle. */

const FOOTER_LINKS = [
  { to: "/materials", label: "Materials" },
  { to: "/pricing", label: "Pricing" },
  { to: "/login", label: "Log in" },
] as const

function SiteFooter({ className, ...props }: React.ComponentProps<"footer">) {
  return (
    <footer data-slot="site-footer" className={cn("w-full", className)} {...props}>
      <div className="mt-10 w-full border-t border-border/50 max-sm:mt-6">
        <div className="px-4 sm:px-10">
          <div className="mx-auto flex max-w-280 flex-wrap items-center justify-between gap-x-6 gap-y-4 py-6">
            <div className="flex items-center gap-2.5">
              <SunMoon className="size-7" />
              <span className="font-serif text-[26px] font-medium text-terracotta-accent italic">
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
        data-slot="site-copyright"
        className="w-full border-t border-border/50"
      >
        <div className="px-4 sm:px-10">
          <p className="mx-auto max-w-280 py-3 text-center font-mono text-tiny tracking-eyebrow text-muted-foreground uppercase">
            © {new Date().getFullYear()} Noor · Free for teachers
          </p>
        </div>
      </div>
    </footer>
  )
}

export { SiteFooter }
