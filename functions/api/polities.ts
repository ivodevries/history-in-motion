import { Hono } from 'hono';

const app = new Hono();

app.get('/polities', async (c) => {
  const data = await import('../polity-response.json');
  return c.json(data.default ?? data);
});

export default app;