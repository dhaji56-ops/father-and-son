import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { BUILD_DATE } from './scripts/build-date.mjs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Baked into the bundle so the app filters scheduled content by the same
  // date the prerender and sitemap used — see scripts/build-date.mjs.
  define: {
    __BUILD_DATE__: JSON.stringify(BUILD_DATE),
  },
})
