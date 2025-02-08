import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    hmr: {
      protocol: 'ws',               // HTTP için ws kullanın
      host: 'www.accvalo.shop',       
      clientPort: 5173,             // Varsayılan geliştirme portu veya uygun başka bir port
    }
  }
})
