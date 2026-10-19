import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// @ts-ignore
import { handleApiRequest, startAutoSyncCron } from './server/apiHandler.mjs';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'dark-matter-postgres-cron-api',
      configureServer(server) {
        startAutoSyncCron();
        server.middlewares.use((req, res, next) => {
          if (req.url && req.url.startsWith('/api/')) {
            handleApiRequest(req, res, next);
          } else {
            next();
          }
        });
      },
    },
  ],
});
