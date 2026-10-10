import { Outlet } from "react-router"

import { Footer } from "@/components/sections/footer"
import { Header } from "@/components/sections/header"

// Shared shell for the public marketing pages: home, materials, pricing.
export default function SiteLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}
