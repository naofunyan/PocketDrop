import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // This ensures your CSS and images load correctly on GitHub Pages
  base: './',

  build: {
    // Tells Vite to drop the compiled website exactly where GitHub expects it
    outDir: '../docs',

    // Wipes the old docs folder clean before every build so no junk is left behind
    emptyOutDir: true
  }
})