import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'demo-dist',
    rollupOptions: {
      input: 'index.html',
    },
  },
});
