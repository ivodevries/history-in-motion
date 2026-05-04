import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');
const functionsDir = path.resolve(__dirname, '../functions');

const polityData = JSON.parse(fs.readFileSync(path.join(functionsDir, 'polity-response.json'), 'utf-8'));
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://history-in-motion.com',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
};

const workerCode = `export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === '/api/polities') {
      return new Response(JSON.stringify(${JSON.stringify(polityData)}), {
        headers: { ...${JSON.stringify(corsHeaders)}, 'Content-Type': 'application/json' }
      });
    }

    if (url.pathname === '/api/history-events') {
      return new Response(JSON.stringify({ data: [] }), {
        headers: { ...${JSON.stringify(corsHeaders)}, 'Content-Type': 'application/json' }
      });
    }

    return new Response('Not Found', { status: 404 });
  }
};`;

fs.writeFileSync(path.join(distDir, '_worker.js'), workerCode);

const routes = {
  version: 1,
  include: ['/api/*'],
  exclude: []
};

fs.writeFileSync(path.join(distDir, '_routes.json'), JSON.stringify(routes, null, 2));

console.log('Generated _worker.js and _routes.json');