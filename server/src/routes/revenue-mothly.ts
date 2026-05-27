import { FastifyInstance } from 'fastify'
import { sql, eq, and, gte, lte } from 'drizzle-orm'
import { db } from '../db'
import { orders, orderDetails } from '../db/schema'

export async function revenueMonthlyRoutes(app: FastifyInstance) {
  app.get('/revenue-monthly', async (request) => {
    const { startDate, endDate } = request.query as { startDate?: string, endDate?: string }
    const conditions = []

    if (startDate) conditions.push(gte(orders.orderDate, startDate))
    if (endDate) conditions.push(lte(orders.orderDate, endDate))
    const dateFilter = conditions.length > 0 ? and(...conditions) : undefined

    const rows = await db
      .select({
        month: sql<string>`TO_CHAR(${orders.orderDate}, 'YYYY-MM')`,
        revenue: sql<number>`SUM(${orderDetails.unitPrice} * ${orderDetails.quantity})`,
      })
      .from(orders)
      .innerJoin(orderDetails, eq(orders.orderId, orderDetails.orderId))
      .where(dateFilter)
      .groupBy(sql`TO_CHAR(${orders.orderDate}, 'YYYY-MM')`)
      .orderBy(sql`TO_CHAR(${orders.orderDate}, 'YYYY-MM')`)

      return rows
  })
}