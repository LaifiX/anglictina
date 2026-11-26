import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) return 'vendor';
          if (id.includes('src/data/pathway/')) return 'pathway-bank';
          if (id.includes('src/data/irregularVerbs')) return 'verbs-bank';
          if (id.includes('src/data/tenses/present')) return 'tenses-present-bank';
          if (
            id.includes('src/data/tenses/past') ||
            id.includes('src/data/tenses/future')
          ) {
            return 'tenses-past-future-bank';
          }
        },
      },
    },
  },
});
