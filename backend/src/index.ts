import { Hono, Context } from 'hono';

type EnvContext = Context<{ Bindings: Env }>;


const app = new Hono();

app.use('*', async (c, next) => {
    await next();
    const origin = c.req.header('Origin');
    const allowedOrigins = ['http://localhost:5173', 'https://history-in-motion.com'];
    if (allowedOrigins.includes(origin ?? '')) {
        c.res.headers.set('Access-Control-Allow-Origin', origin!);
        c.res.headers.set('Access-Control-Allow-Credentials', 'true');
    }
    c.res.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    c.res.headers.set('Access-Control-Allow-Headers', 'Content-Type,Authorization');
});

app.get('/api/history-events*', async (c: EnvContext) => {
});

app.get('/api/polities*', async (c: EnvContext) => {
  const data = await import('./polity-response.json');
  return c.json(data.default ?? data);
});

export default app;
