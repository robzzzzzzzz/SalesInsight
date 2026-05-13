import { relations } from "drizzle-orm/relations";
import { employees, categories, products, suppliers, region, territories, customers, orders, shippers, employeeTerritories, customerDemographics, customerCustomerDemo, orderDetails } from "./schema";

export const employeesRelations = relations(employees, ({one, many}) => ({
	employee: one(employees, {
		fields: [employees.reportsTo],
		references: [employees.employeeId],
		relationName: "employees_reportsTo_employees_employeeId"
	}),
	employees: many(employees, {
		relationName: "employees_reportsTo_employees_employeeId"
	}),
	orders: many(orders),
	employeeTerritories: many(employeeTerritories),
}));

export const productsRelations = relations(products, ({one, many}) => ({
	category: one(categories, {
		fields: [products.categoryId],
		references: [categories.categoryId]
	}),
	supplier: one(suppliers, {
		fields: [products.supplierId],
		references: [suppliers.supplierId]
	}),
	orderDetails: many(orderDetails),
}));

export const categoriesRelations = relations(categories, ({many}) => ({
	products: many(products),
}));

export const suppliersRelations = relations(suppliers, ({many}) => ({
	products: many(products),
}));

export const territoriesRelations = relations(territories, ({one, many}) => ({
	region: one(region, {
		fields: [territories.regionId],
		references: [region.regionId]
	}),
	employeeTerritories: many(employeeTerritories),
}));

export const regionRelations = relations(region, ({many}) => ({
	territories: many(territories),
}));

export const ordersRelations = relations(orders, ({one, many}) => ({
	customer: one(customers, {
		fields: [orders.customerId],
		references: [customers.customerId]
	}),
	employee: one(employees, {
		fields: [orders.employeeId],
		references: [employees.employeeId]
	}),
	shipper: one(shippers, {
		fields: [orders.shipVia],
		references: [shippers.shipperId]
	}),
	orderDetails: many(orderDetails),
}));

export const customersRelations = relations(customers, ({many}) => ({
	orders: many(orders),
	customerCustomerDemos: many(customerCustomerDemo),
}));

export const shippersRelations = relations(shippers, ({many}) => ({
	orders: many(orders),
}));

export const employeeTerritoriesRelations = relations(employeeTerritories, ({one}) => ({
	territory: one(territories, {
		fields: [employeeTerritories.territoryId],
		references: [territories.territoryId]
	}),
	employee: one(employees, {
		fields: [employeeTerritories.employeeId],
		references: [employees.employeeId]
	}),
}));

export const customerCustomerDemoRelations = relations(customerCustomerDemo, ({one}) => ({
	customerDemographic: one(customerDemographics, {
		fields: [customerCustomerDemo.customerTypeId],
		references: [customerDemographics.customerTypeId]
	}),
	customer: one(customers, {
		fields: [customerCustomerDemo.customerId],
		references: [customers.customerId]
	}),
}));

export const customerDemographicsRelations = relations(customerDemographics, ({many}) => ({
	customerCustomerDemos: many(customerCustomerDemo),
}));

export const orderDetailsRelations = relations(orderDetails, ({one}) => ({
	product: one(products, {
		fields: [orderDetails.productId],
		references: [products.productId]
	}),
	order: one(orders, {
		fields: [orderDetails.orderId],
		references: [orders.orderId]
	}),
}));