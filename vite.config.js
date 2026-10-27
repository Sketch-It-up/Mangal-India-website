import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// Third-party libraries in their own chunks: they download in parallel with the app
// code and stay cached across deploys when only site content changes.
const vendorChunks = {
  react: ['react', 'react-dom', 'react-router', 'react-router-dom', 'react-helmet-async', 'scheduler'],
  motion: ['framer-motion', 'motion-dom', 'motion-utils'],
  swiper: ['swiper'],
  geo: ['d3-geo', 'd3-array', 'topojson-client'],
}

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Rollup module ids use forward slashes on every platform.
          const pkg = id.match(/node_modules\/((?:@[^/]+\/)?[^/]+)/)?.[1]
          return pkg && Object.keys(vendorChunks).find((chunk) => vendorChunks[chunk].includes(pkg))
        },
      },
    },
  },
})
