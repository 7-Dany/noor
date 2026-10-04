import { createCookieSessionStorage, type SessionStorage } from "react-router"

import { ThemeStore, type ThemePreference } from "./theme-store"

const THEME_COOKIE_NAME = "theme"

/**
 * Server-side theme persistence. Owns the signed cookie: reads the stored
 * preference per request and produces Set-Cookie headers on change.
 * The secret is resolved on first use, never at import time, so a missing
 * secret fails the request that needs it instead of killing server boot.
 */
class ThemeSession {
  private storage: SessionStorage | null = null

  async getTheme(request: Request): Promise<ThemePreference | null> {
    const session = await this.getStorage().getSession(
      request.headers.get("Cookie")
    )
    const theme = session.get(THEME_COOKIE_NAME)
    return ThemeStore.isValidPreference(theme) ? theme : null
  }

  async commitTheme(theme: ThemePreference): Promise<string> {
    const session = await this.getStorage().getSession()
    session.set(THEME_COOKIE_NAME, theme)
    return this.getStorage().commitSession(session)
  }

  private getStorage() {
    if (!this.storage) {
      const secret = process.env.SESSION_SECRET
      if (!secret) {
        throw new Error(
          "SESSION_SECRET is not set. In dev it comes from .env; in production set it as a real environment variable on the server."
        )
      }
      this.storage = createCookieSessionStorage({
        cookie: {
          name: THEME_COOKIE_NAME,
          path: "/",
          httpOnly: true,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
          secrets: [secret],
        },
      })
    }
    return this.storage
  }
}

export const themeSession = new ThemeSession()
