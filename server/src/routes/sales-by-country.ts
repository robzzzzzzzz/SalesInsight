import { FastifyInstance } from 'fastify'
import { sql, eq, and, gte, lte, sum, desc } from 'drizzle-orm'
import { db } from '../db'
import { orders, orderDetails } from '../db/schema'

export async function salesByCountryRoutes(app: FastifyInstance) {
  app.get('/sales-by-country', async (request) => {
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
        countryName: sql<string>`${orders.shipCountry}`,
        totalSales: totalDeVendas,
      })
      .from(orders)
      .innerJoin(orderDetails, eq(orders.orderId, orderDetails.orderId))
      .where(dateFilter)
      .groupBy(sql`${orders.shipCountry}`)
      .orderBy(desc(totalDeVendas))
      .limit(10)
    return rows
  })
}