import { Outlet } from "react-router"

import { SiteFooter } from "@/components/sections/site-footer"
import { SiteHeader } from "@/pages/landing/header/site-header"

// Shared shell for the public marketing pages: home, materials, pricing.
export default function SiteLayout() {
  return (
    <>
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </>
  )
}
