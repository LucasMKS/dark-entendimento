import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { handleApiRequest, initDatabase, startAutoSyncCron } from './apiHandler.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');
const PORT = Number(process.env.PORT || 80);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

const server = http.createServer(async (req, res) => {
  // 1. Handle /api/* endpoints (PostgreSQL + Auto-Sync)
  if (req.url && req.url.startsWith('/api/')) {
    return handleApiRequest(req, res);
  }

  // 2. Serve static files from dist/ with SPA fallback
  const safePath = (req.url || '/').split('?')[0];
  let filePath = path.join(DIST_DIR, safePath === '/' ? 'index.html' : safePath);

  if (!filePath.startsWith(DIST_DIR)) {
    res.statusCode = 403;
    return res.end('Forbidden');
  }

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(DIST_DIR, 'index.html');
  }

  try {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.setHeader('Content-Type', contentType);
    if (ext !== '.html') {
      res.setHeader('Cache-Control', 'public, max-age=2592000, immutable');
    }
    fs.createReadStream(filePath).pipe(res);
  } catch {
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
});

server.listen(PORT, async () => {
  console.log(`========================================================================`);
  console.log(` ⚛️  DARK MATTER ATLAS // SERVIDOR DE PRODUÇÃO + CRON + POSTGRESQL`);
  console.log(` 🌐 Porta HTTP: ${PORT}`);
  await initDatabase();
  startAutoSyncCron();
  console.log(`========================================================================`);
});
