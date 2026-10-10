import { defineConfig } from 'vite';
import { monorepoLibraryPlugin } from '../../tools/vite-plugin-monorepo';

export default defineConfig({
  plugins: [monorepoLibraryPlugin()],
});
