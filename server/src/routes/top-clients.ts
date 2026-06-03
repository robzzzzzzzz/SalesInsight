import { FastifyInstance } from 'fastify'
import { sql, eq, and, gte, lte, sum, desc } from 'drizzle-orm'
import { db } from '../db'
import { orders, orderDetails, customers } from '../db/schema'

export async function topClientsRoutes(app: FastifyInstance) {
  app.get('/top-clients', async (request) => {
    const { startDate, endDate } = request.query as { startDate?: string, endDate?: string }
    const conditions = []

    if (startDate) conditions.push(gte(orders.orderDate, startDate))
    if (endDate) conditions.push(lte(orders.orderDate, endDate))
    const dateFilter = conditions.length > 0 ? and(...conditions) : undefined

    const totalDeVendas = sum(
    sql`${orderDetails.unitPrice} * ${orderDetails.quantity} * (1 - ${orderDetails.discount})`
    ).as('total_de_vendas')

    const rows = await db
      .select({
        companyName: sql<string>`${customers.companyName}`,
        totalSales: totalDeVendas,
      })
      .from(customers)
      .innerJoin(orders, eq(orders.customerId, customers.customerId))
      .innerJoin(orderDetails, eq(orders.orderId, orderDetails.orderId))
      .where(dateFilter)
      .groupBy(sql`${customers.companyName}`)
      .orderBy(desc(totalDeVendas))
      .limit(10)
    return rows
  })
}