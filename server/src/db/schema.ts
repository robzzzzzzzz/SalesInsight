import { pgTable, serial, integer, real, date, varchar, unique } from 'drizzle-orm/pg-core';

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),                // chave substituta (opcional, mas evita composta)
  orderId: integer('order_id').notNull().unique(),
  customerId: varchar('customer_id'),
  employeeId: integer('employee_id'),
  orderDate: date('order_date'),
});

export const orderDetails = pgTable('order_details', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id').notNull().references(() => orders.orderId),
  productId: integer('product_id').notNull(),
  unitPrice: real('unit_price'),
  quantity: integer('quantity'),
  discount: real('discount'),
});