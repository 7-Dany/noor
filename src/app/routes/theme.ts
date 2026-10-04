import { themeSession } from "../../context/theme/theme-session.server"
import { ThemeStore } from "../../context/theme/theme-store"
import type { Route } from "./+types/theme"

export async function action({ request }: Route.ActionArgs) {
  const body: unknown = await request.json()
  const theme =
    typeof body === "object" && body !== null
      ? (body as Record<string, unknown>)["theme"]
      : null

  if (!ThemeStore.isValidPreference(theme)) {
    throw new Response("Unsupported theme", { status: 400 })
  }

  return new Response("ok", {
    headers: { "Set-Cookie": await themeSession.commitTheme(theme) },
  })
}
