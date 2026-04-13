import { Hono, Context } from 'hono';

type EnvContext = Context<{ Bindings: Env }>;


const app = new Hono();

app.use('*', async (c, next) => {
    await next();
    c.res.headers.set('Access-Control-Allow-Origin', 'http://localhost:5173');
    c.res.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    c.res.headers.set('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    c.res.headers.set('Access-Control-Allow-Credentials', 'true');
});

app.get('/history-events*', async (c: EnvContext) => {
});

app.get('/polities*', async (c: EnvContext) => {
  const data = await import('./polity-response.json');
  return c.json(data.default ?? data);
});

export default app;
