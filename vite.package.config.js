import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: [/^lit/],
      output: {
        preserveModules: true,
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
});
