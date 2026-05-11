import { pgTable, serial, varchar, numeric, date, integer } from 'drizzle-orm/pg-core';

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  customerId: varchar('customer_id').notNull(),
  employeeId: integer('employee_id'),
  orderDate: date('order_date').notNull(),
});

export const orderDetails = pgTable('order_details', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id').references(() => orders.id),
  productId: integer('product_id'),
  unitPrice: numeric('unit_price', { precision: 10, scale: 2 }),
  quantity: integer('quantity'),
  discount: numeric('discount', { precision: 4, scale: 2 }),
});