import Fastify from 'fastify'
import cors from '@fastify/cors'
import { salesSummaryRoutes } from './routes/sales-sumary'
import { revenueMonthlyRoutes } from './routes/revenue-mothly'
import { salesByCategoryRoutes } from './routes/sales-by-category'
import { topClientsRoutes } from './routes/top-clients'
import { salesByCountryRoutes } from './routes/sales-by-country'

const app = Fastify()

app.register(cors, { origin: 'http://localhost:5173' })
app.register(salesSummaryRoutes, { prefix: 'api' })
app.register(revenueMonthlyRoutes, { prefix: 'api' })
app.register(salesByCategoryRoutes, { prefix: 'api' })
app.register(topClientsRoutes, { prefix: 'api' })
app.register(salesByCountryRoutes, { prefix: 'api' })

app.listen({ port: 3000 }, (err, address) => {
  if (err) throw err
  console.log(`Servidor rodando em ${address}`)
})