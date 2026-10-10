import {
  layout,
  index,
  route,
  type RouteConfig,
} from "@react-router/dev/routes"

export default [
  layout("routes/site/_layout.tsx", [
    index("routes/site/home.tsx"),
    route("materials", "routes/site/materials.tsx"),
    route("materials/:id", "routes/site/material-detail.tsx"),
    route("materials/:id/:chapterId", "routes/site/chapter-detail.tsx"),
    route("pricing", "routes/site/pricing.tsx"),
    // Preview of the first lesson; moves under materials/:id once lessons route.
    route("lessons/letters", "routes/site/letters.tsx"),
  ]),
  route("login", "routes/auth/login.tsx"),
  route("signup", "routes/auth/signup.tsx"),
  route("action/theme/set", "routes/system/theme.ts"),
  route("*", "routes/system/not-found.tsx"),
] satisfies RouteConfig
