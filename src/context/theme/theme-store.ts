export type ThemePreference = "light" | "dark" | "system"
export type ResolvedTheme = "light" | "dark"

const SYSTEM_QUERY = "(prefers-color-scheme: dark)"

/** Global shortcut that toggles the theme. Change to any key you want. */
export const THEME_TOGGLE_HOTKEY = "d"

const VALID_PREFERENCES: ReadonlySet<string> = new Set([
  "light",
  "dark",
  "system",
])

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) {
    return false
  }
  if (target.isContentEditable) {
    return true
  }
  return Boolean(
    target.closest("input, textarea, select, [contenteditable='true']")
  )
}

function disableTransitionsTemporarily(): () => void {
  const style = document.createElement("style")
  style.appendChild(
    document.createTextNode(
      "*,*::before,*::after{-webkit-transition:none!important;transition:none!important}"
    )
  )
  document.head.appendChild(style)

  return () => {
    window.getComputedStyle(document.body)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        style.remove()
      })
    })
  }
}

/**
 * Singleton theme state. Owns the preference, resolves "system" against the
 * OS, applies it to the document, and notifies React through the
 * useSyncExternalStore contract
 * (subscribe / getSnapshot / getServerSnapshot).
 *
 * Persistence is the theme cookie's job (see theme-session.server.ts): the
 * loader feeds the stored value in through initialize(), and setPreference()
 * writes it back through the set-theme action. This store only mirrors it
 * in memory, so server and client can never disagree.
 *
 * Everything touching window/document runs client-side only: subscriptions
 * and effects never execute on the server, and getServerSnapshot is fixed.
 */
export class ThemeStore {
  private listeners = new Set<() => void>()
  private preference: ThemePreference
  private mediaQuery: MediaQueryList | null = null
  private mounted = false

  constructor(defaultPreference: ThemePreference = "system") {
    this.preference = defaultPreference
  }

  static isValidPreference(value: unknown): value is ThemePreference {
    return typeof value === "string" && VALID_PREFERENCES.has(value)
  }

  subscribe = (callback: () => void): (() => void) => {
    this.listeners.add(callback)
    return () => {
      this.listeners.delete(callback)
    }
  }

  getSnapshot = (): ThemePreference => {
    return this.preference
  }

  getServerSnapshot = (): ThemePreference => {
    return "system"
  }

  getPreference(): ThemePreference {
    return this.preference
  }

  getResolvedTheme(): ResolvedTheme {
    if (this.preference === "dark" || this.preference === "light") {
      return this.preference
    }
    return this.readSystemTheme()
  }

  /**
   * Load the authoritative value (from the root loader's cookie read).
   * Call once when the app starts; later changes go through setPreference.
   */
  initialize(preference: ThemePreference): void {
    this.setPreference(preference, { persist: false })
  }

  setPreference(
    next: ThemePreference,
    options: { persist?: boolean } = {}
  ): void {
    const { persist = true } = options
    if (next !== this.preference) {
      this.preference = next
      this.notify()
    }
    if (persist) {
      void this.persist(next).catch(() => {
        // Offline or action down: memory already updated, the cookie
        // simply stays one change behind until the next successful save.
      })
    }
  }

  toggle(): void {
    const current = this.getResolvedTheme()
    this.setPreference(current === "dark" ? "light" : "dark")
  }

  /** Write the preference back to the cookie. Client only. */
  async persist(preference: ThemePreference): Promise<void> {
    await fetch("/action/theme/set", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ theme: preference }),
    })
  }

  /** Reflect the preference on <html>. Client only; call from an effect. */
  applyToDocument(disableTransitionOnChange = true): void {
    const restoreTransitions = disableTransitionOnChange
      ? disableTransitionsTemporarily()
      : null

    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(this.getResolvedTheme())

    if (restoreTransitions) {
      restoreTransitions()
    }
  }

  /**
   * Install OS and hotkey listeners. Idempotent; call from an effect and
   * run the returned cleanup on unmount.
   */
  mount(): () => void {
    if (this.mounted) {
      return () => this.unmount()
    }
    this.mounted = true

    this.mediaQuery = window.matchMedia(SYSTEM_QUERY)
    this.mediaQuery.addEventListener("change", this.notify)
    window.addEventListener("keydown", this.handleHotkey)

    return () => this.unmount()
  }

  private unmount(): void {
    this.mediaQuery?.removeEventListener("change", this.notify)
    this.mediaQuery = null
    window.removeEventListener("keydown", this.handleHotkey)
    this.mounted = false
  }

  private readSystemTheme(): ResolvedTheme {
    return window.matchMedia(SYSTEM_QUERY).matches ? "dark" : "light"
  }

  private handleHotkey = (event: KeyboardEvent): void => {
    if (event.repeat) {
      return
    }
    if (event.metaKey || event.ctrlKey || event.altKey) {
      return
    }
    if (isEditableTarget(event.target)) {
      return
    }
    if (event.key.toLowerCase() !== THEME_TOGGLE_HOTKEY) {
      return
    }
    this.toggle()
  }

  private notify = (): void => {
    this.listeners.forEach((notify) => notify())
  }
}

export const themeStore = new ThemeStore()
