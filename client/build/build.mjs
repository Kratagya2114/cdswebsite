import { build } from '/home/claude/.npm-global/lib/node_modules/tsx/node_modules/esbuild/lib/main.js';
import fs from 'fs';
const out = await build({
  entryPoints: ['src/main.tsx'], bundle: true, write: false, minify: true, format: 'iife', outdir: 'dist',
  alias: { 'react-router-dom': './src/router.tsx' },
  nodePaths: ['/home/claude/.npm-global/lib/node_modules'],
  jsx: 'automatic', loader: { '.css': 'css' },
  define: { 'import.meta.env.VITE_HASH_ROUTER': '"1"', 'import.meta.env.VITE_API_URL': 'undefined', 'import.meta.env.DEV': 'false', 'import.meta.env.BASE_URL': '"/"', 'process.env.NODE_ENV': '"production"' },
  logLevel: 'error',
});
let js = '', css = '';
for (const f of out.outputFiles) { if (f.path.endsWith('.js')) js = f.text; else if (f.path.endsWith('.css')) css = f.text; }
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/<script type="module"[^>]*><\/script>/, '').replace(/<link rel="icon"[^>]*>/, '').replace(/<meta[^>]*og:image[^>]*>/, '');
const shim = `<script>(function(){var of=window.fetch;window.fetch=function(u,o){var url=typeof u==='string'?u:(u&&u.url)||'';if(url.indexOf('/api/')>-1&&url.indexOf('http')!==0){var b={ok:true};if(url.indexOf('/api/chat')>-1)b.reply="Hi! This is a preview of the CDS assistant. Once your Gemini API key is added to the backend, real answers appear here.";return new Promise(function(r){setTimeout(function(){r(new Response(JSON.stringify(b),{status:200,headers:{'Content-Type':'application/json'}}))},600)})}return of.apply(this,arguments)}})();</script>`;
html = html.replace('</head>', `<style>${css}</style></head>`).replace('</body>', `${shim}<script>${js.replace(/<\/script>/g, '<\\/script>')}</script></body>`);
fs.mkdirSync('/mnt/user-data/outputs', { recursive: true });
fs.writeFileSync('/mnt/user-data/outputs/index.html', html);
console.log('built', html.length);
