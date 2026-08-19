import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.BASE_PATH || '/', // agar na mile to '/' le lega
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
      '@assets': path.resolve(import.meta.dirname, '..', '..', 'attached_assets'),
    },
    dedupe: ['react', 'react-dom'],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: 'dist', // Vercel ke liye simple rakho
    emptyOutDir: true,
  },
  server: {
    port: Number(process.env.PORT) || 5173, // default port
    host: '0.0.0.0',
  },
  preview: {
    port: Number(process.env.PORT) || 4173,
    host: '0.0.0.0',
  },
});
