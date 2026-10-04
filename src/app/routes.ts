import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [
  index("routes/home.tsx"),
  route("action/theme/set", "routes/theme.ts"),
  route("*", "routes/$.tsx"),
] satisfies RouteConfig
