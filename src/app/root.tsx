import type { ReactNode } from "react"
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from "react-router"
import { AppProvider, APP_DIRECTION } from "@/context/app/app-provider"
import { themeSession } from "@/context/theme/theme-session.server"
import "../index.css"
import type { Route } from "./+types/root"

export async function loader({ request }: Route.LoaderArgs) {
  return { theme: await themeSession.getTheme(request) }
}

export function Layout({ children }: { children: ReactNode }) {
  const data = useRouteLoaderData<typeof loader>("root")
  // Only resolved themes become a class; "system" is resolved by theme-init.js.
  const themeClass =
    data?.theme === "light" || data?.theme === "dark" ? data.theme : undefined
  return (
    <html
      lang="en"
      dir={APP_DIRECTION}
      className={themeClass}
      suppressHydrationWarning
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <Meta />
        <Links />
        {/*
          First-visit fallback only (see public/theme-init.js): a classic
          head script blocks parsing, so this resolves the OS theme before
          first paint when SSR rendered no class. No-op otherwise.
        */}
        <script src="/theme-init.js" />
      </head>
      <body>
        <AppProvider initialTheme={data?.theme ?? "system"}>
          {children}
        </AppProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function Root() {
  return <Outlet />
}

export function ErrorBoundary({ error }: { error: unknown }) {
  let message = "Oops!"
  let details = "An unexpected error occurred."
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error"
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack ? (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      ) : null}
    </main>
  )
}
