import { FastifyInstance } from 'fastify'
import { sql, eq, and, gte, lte, sum, count } from 'drizzle-orm'
import { db } from '../db'
import { orders, orderDetails, products, categories } from '../db/schema'

export async function salesByCategoryRoutes(app: FastifyInstance) {
  app.get('/sales-by-category', async (request) => {
    const { startDate, endDate } = request.query as { startDate?: string, endDate?: string }
    const conditions = []

    if (startDate) conditions.push(gte(orders.orderDate, startDate))
    if (endDate) conditions.push(lte(orders.orderDate, endDate))
    const dateFilter = conditions.length > 0 ? and(...conditions) : undefined

    const rows = await db
      .select({
        categoryName: sql<string>`${categories.categoryName}`,
        totalQuantity: sql<number>`COUNT(${categories.categoryId})`,
        totalSales: sql<number>`SUM(${orderDetails.unitPrice} * ${orderDetails.quantity} * (1 - ${orderDetails.discount}))`,
      })
      .from(orders)
      .innerJoin(orderDetails, eq(orders.orderId, orderDetails.orderId))
      .innerJoin(products, eq(orderDetails.productId, products.productId))
      .innerJoin(categories, eq(products.categoryId, categories.categoryId))
      .where(dateFilter)
      .groupBy(sql`${categories.categoryName}`)
      .orderBy(sql`${categories.categoryName}`)

    return rows
  })
}
