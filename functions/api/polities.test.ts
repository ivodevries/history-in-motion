import { describe, it, expect } from 'vitest';

describe('GET /api/polities', () => {
  it('returns valid JSON', async () => {
    const { default: app } = await import('./polities');
    
    const res = await app.fetch(new Request('http://test/polities'));
    const text = await res.text();
    const body = JSON.parse(text);
    
    expect(res.status).toBe(200);
    expect(body).toHaveProperty('data');
    expect(body.data).toBeInstanceOf(Array);
    expect(body.data[0]).toHaveProperty('attributes');
    expect(body.data[0].attributes).toHaveProperty('name');
  });
});