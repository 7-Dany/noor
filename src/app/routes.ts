import {
  layout,
  index,
  route,
  type RouteConfig,
} from "@react-router/dev/routes"

export default [
  layout("routes/site-layout.tsx", [
    index("routes/home.tsx"),
    route("materials", "routes/materials.tsx"),
    route("pricing", "routes/pricing.tsx"),
  ]),
  route("login", "routes/login.tsx"),
  route("signup", "routes/signup.tsx"),
  route("action/theme/set", "routes/theme.ts"),
  route("*", "routes/$.tsx"),
] satisfies RouteConfig
