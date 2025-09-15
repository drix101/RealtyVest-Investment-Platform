import { defineConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(),
    visualizer({
      open: true,
      filename: 'stats.html',
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor'
            }
            if (id.includes('react-router')) {
              return 'router-vendor'
            }
            if (id.includes('lucide-react')) {
              return 'icons-vendor'
            }
            return 'vendor'
          }
          
          // Feature-based chunks
          if (id.includes('/pages/Auth') || id.includes('/contexts/Auth') || id.includes('supabaseAuth')) {
            return 'auth-chunk'
          }
          if (id.includes('/pages/Properties') || id.includes('realEstateApi')) {
            return 'properties-chunk'
          }
        }
      }
    }
  }
})
