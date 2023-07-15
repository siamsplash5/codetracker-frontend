import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://codetracker-backend.vercel.app/', // Replace with your backend API URL
        changeOrigin: false,
        secure: true, // Set to true if your backend server uses HTTPS
      },
    },
  },
})
