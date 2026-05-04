import { Hono } from 'hono';

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

export default app;