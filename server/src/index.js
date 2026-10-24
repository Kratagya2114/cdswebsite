import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { config, emailConfigured, chatConfigured } from './config.js';
import formsRouter from './routes/forms.js';
import chatRouter from './routes/chat.js';

const app = express();
app.set('trust proxy', 1);

app.use(helmet({ contentSecurityPolicy: false }));
app.use(
  cors((req, cb) => {
    const origin = req.headers.origin;
    let sameHost = false;
    try {
      // Same-origin requests (site and API served from one host) always pass.
      sameHost = Boolean(origin) && new URL(origin).host === req.headers.host;
    } catch { /* malformed Origin header */ }
    // Also allow server-to-server (no Origin header), local dev, and explicitly configured origins.
    const isLocalhost = Boolean(origin) && /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
    const allowed = !origin || sameHost || isLocalhost || config.clientOrigins.includes(origin);
    if (allowed) return cb(null, { origin: true });
    cb(new Error('Origin not allowed'));
  }),
);
app.use(express.json({ limit: '20kb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, emailConfigured: emailConfigured(), chatConfigured: chatConfigured() });
});

app.use('/api', formsRouter);
app.use('/api', chatRouter);

app.use('/api', (_req, res) => res.status(404).json({ ok: false, error: 'Not found' }));

// Optionally serve the built frontend (single-host deployment).
const here = path.dirname(fileURLToPath(import.meta.url));
const dist = path.resolve(here, '../../client/dist');
if (fs.existsSync(dist)) {
  app.use(express.static(dist));
  // SPA fallback for client-side routes (Express 5 no longer accepts a bare '*' path).
  app.use((req, res, next) => {
    if (req.method !== 'GET' || req.path.startsWith('/api')) return next();
    res.sendFile(path.join(dist, 'index.html'));
  });
}

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error('[server]', err.message);
  res.status(err.message === 'Origin not allowed' ? 403 : 500).json({ ok: false, error: 'Something went wrong.' });
});

app.listen(config.port, () => {
  console.log(`CDS server listening on :${config.port}`);
  console.log(`  email: ${emailConfigured() ? 'configured' : 'NOT configured (set SMTP_* in .env)'}`);
  console.log(`  chat : ${chatConfigured() ? 'configured' : 'NOT configured (set GEMINI_API_KEY in .env)'}`);
});
