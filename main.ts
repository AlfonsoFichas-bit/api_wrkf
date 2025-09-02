import { Hono } from '@hono/hono';
import v1 from './src/api/v1/index.ts';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hola, Hono!\nVisita /api/v1 para ver la API');
});

app.route('/api/v1', v1);

if (import.meta.main) {
  Deno.serve(app.fetch);
  console.log('Servidor Hono en ejecución en el puerto 8000. Visita: http://localhost:8000');
}