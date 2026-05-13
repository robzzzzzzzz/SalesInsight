import Fastify from 'fastify';
import cors from '@fastify/cors';
import { dashboardRoutes } from './routes/dashboard';

const app = Fastify();

app.register(cors, { origin: 'http://localhost:5173' });
app.register(dashboardRoutes, { prefix: '' });

app.listen({ port: 3000 }, (err, address) => {
  if (err) throw err;
  console.log(`Servidor rodando em ${address}`);
});