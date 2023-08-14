import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        // target: 'http://localhost:5000',
        target: 'https://codetracker-backend.vercel.app',
        changeOrigin: true,
        secure: true, 
      },
    },
  },
})
