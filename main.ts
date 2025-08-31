import { Hono } from '@hono/hono';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello, Hono!');
});

if (import.meta.main) {
  Deno.serve(app.fetch);
  console.log('Hono server listening on http://localhost:8000');
}