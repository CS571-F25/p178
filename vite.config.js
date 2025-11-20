import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/p178/' : '/',
  plugins: [react()],
  build: {
    outDir: 'docs'
  }
});

// export default defineConfig({
// plugins: [react()],
// base: '/p178/',
// build: {
// outDir: 'docs'
// }
// })