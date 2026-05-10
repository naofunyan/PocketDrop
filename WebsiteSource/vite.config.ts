import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    // 1. THE SMART BASE PATH
    base: command === 'build' ? '/PocketDrop/' : '/',

    // 2. KEEPS TAILWIND ALIVE
    plugins: [react(), tailwindcss()],

    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },

    // 3. THE GITHUB PAGES REDIRECT
    build: {
      outDir: '../docs',
      emptyOutDir: true
    },

    server: {
      // Force Vite to use a specific, empty port
      port: 5173,
      // Tell Vite to crash immediately if this port is taken, rather than getting hijacked
      strictPort: true,

      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});