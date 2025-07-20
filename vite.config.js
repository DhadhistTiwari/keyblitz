import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  server: {
    host: '0.0.0.0', // Allow access from external devices
    port: 5173, // Use a different port
  },
})
