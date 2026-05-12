import { FastifyInstance } from 'fastify';
import { and, gte, lte, sum, count, avg, eq } from 'drizzle-orm';
import { db } from '../db';
import { orders, orderDetails } from '../db/schema';

export async function dashboardRoutes(app: FastifyInstance) {
  app.get('/dashboard', async (request) => {
    const { startDate, endDate } = request.query as { startDate?: string; endDate?: string };

    const conditions = [];
    if (startDate) conditions.push(gte(orders.orderDate, startDate));
    if (endDate) conditions.push(lte(orders.orderDate, endDate));
    const dateFilter = conditions.length > 0 ? and(...conditions) : undefined;

    const [kpi] = await db
      .select({
        totalRevenue: sum(orderDetails.unitPrice),
        totalOrders: count(orders.orderId),
        avgTicket: avg(orderDetails.unitPrice),
      })
      .from(orders)
      .innerJoin(orderDetails, eq(orders.orderId, orderDetails.orderId))
      .where(dateFilter);

    return kpi;
  });
}