import { crx } from '@crxjs/vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import manifest from './src/manifest';
import removeSrcFromHtmlPaths from './utils/plugins/removeSrcFromHtmlPaths';

export default defineConfig({
  plugins: [react(), crx({ manifest }), removeSrcFromHtmlPaths()],
});
