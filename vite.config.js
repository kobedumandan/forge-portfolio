import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// `base` must match the repo name so built asset URLs resolve under
// https://kobedumandan.github.io/forge-portfolio/
export default defineConfig({
  base: '/forge-portfolio/',
  plugins: [react()],
})
