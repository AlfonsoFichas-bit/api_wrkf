import { Hono } from '@hono/hono';
import v1 from './src/api/v1/index.ts';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello, Hono!');
});

app.route('/api/v1', v1);

if (import.meta.main) {
  Deno.serve(app.fetch);
  console.log('Hono server listening on http://localhost:8000');
}