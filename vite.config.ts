import { resolve } from "node:path"
import { reactRouter } from "@react-router/dev/vite"
import netlifyReactRouter from "@netlify/vite-plugin-react-router"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), netlifyReactRouter()],
  resolve: {
    alias: {
      "@": resolve(import.meta.dirname, "./src"),
    },
  },
})
