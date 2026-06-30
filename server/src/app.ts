import Fastify from 'fastify'
import cors from '@fastify/cors'
import { salesSummaryRoutes } from './routes/sales-sumary'
import { revenueMonthlyRoutes } from './routes/revenue-mothly'
import { salesByCategoryRoutes } from './routes/sales-by-category'
import { topClientsRoutes } from './routes/top-clients'
import { salesByCountryRoutes } from './routes/sales-by-country'

const app = Fastify()

const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173'

app.setErrorHandler((error, request, reply) => {
  const err = error as any
  console.error('Erro capturado:', err.message)
  const statusCode = err.statusCode || 500
  reply.status(statusCode).send({
    statusCode,
    error: statusCode === 500 ? 'Erro interno do servidor' : err.message,
  })
})

app.register(cors, { origin: allowedOrigin })
app.register(salesSummaryRoutes, { prefix: '/api' })
app.register(revenueMonthlyRoutes, { prefix: '/api' })
app.register(salesByCategoryRoutes, { prefix: '/api' })
app.register(topClientsRoutes, { prefix: '/api' })
app.register(salesByCountryRoutes, { prefix: '/api' })

app.listen({ port: Number(process.env.PORT) || 3000, host: '0.0.0.0' }, (err, address) => {
  if (err) throw err
  console.log(`Servidor rodando em ${address}`)
})