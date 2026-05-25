import Fastify from 'fastify'
import cors from '@fastify/cors'
import { salesSummaryRoutes } from './routes/sales-sumary'
import { revenueMonthlyRoutes } from './routes/revenue-mothly'

const app = Fastify()

app.register(cors, { origin: 'http://localhost:5173' })
app.register(salesSummaryRoutes, { prefix: 'api' })
app.register(revenueMonthlyRoutes, { prefix: 'api' })

app.listen({ port: 3000 }, (err, address) => {
  if (err) throw err
  console.log(`Servidor rodando em ${address}`)
})