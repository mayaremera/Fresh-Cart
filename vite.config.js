import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages base path fix
export default defineConfig({
  base: "/Fresh-Cart/",  // 👈 IMPORTANT: Set your repo name here
  plugins: [react()],
})
