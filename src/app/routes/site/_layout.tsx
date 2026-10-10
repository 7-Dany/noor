import { Outlet } from "react-router"

import { Footer } from "@/components/sections/footer"
import { Header } from "@/components/sections/header"

// Shared shell for the public marketing pages: home, materials, pricing.
// Column pinned to the viewport height so the footer rests at the bottom
// on short pages; the page itself (SitePage) grows to fill the gap.
export default function SiteLayout() {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
