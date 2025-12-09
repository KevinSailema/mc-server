import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Configurar para servir archivos grandes sin límite
    hmr: {
      overlay: false
    }
  },
  // Aumentar el límite de advertencia para archivos grandes
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    },
    // Asegurar que los archivos grandes se copien
    assetsInlineLimit: 0,
    copyPublicDir: true
  },
  // Asegurar que los archivos estáticos se copien correctamente
  publicDir: 'public'
})
