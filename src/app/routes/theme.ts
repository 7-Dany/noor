import { themeSession } from "@/context/theme/theme-session.server"
import { ThemeStore } from "@/context/theme/theme-store"
import type { Route } from "./+types/theme"

async function readTheme(request: Request): Promise<unknown> {
  try {
    const body: unknown = await request.json()
    return typeof body === "object" && body !== null
      ? (body as Record<string, unknown>)["theme"]
      : null
  } catch {
    return null
  }
}

export async function action({ request }: Route.ActionArgs) {
  const theme = await readTheme(request)

  if (!ThemeStore.isValidPreference(theme)) {
    throw new Response("Unsupported theme", { status: 400 })
  }

  return new Response("ok", {
    headers: { "Set-Cookie": await themeSession.commitTheme(theme) },
  })
}
