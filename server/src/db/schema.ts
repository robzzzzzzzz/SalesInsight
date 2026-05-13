import { pgTable, smallint, varchar, foreignKey, date, text, real, integer, primaryKey } from "drizzle-orm/pg-core"

import { sql } from "drizzle-orm"

export const region = pgTable("region", {
	regionId: smallint("region_id").primaryKey().notNull(),
	regionDescription: varchar("region_description", { length: 60 }).notNull(),
});

export const shippers = pgTable("shippers", {
	shipperId: smallint("shipper_id").primaryKey().notNull(),
	companyName: varchar("company_name", { length: 40 }).notNull(),
	phone: varchar({ length: 24 }),
});

export const employees = pgTable("employees", {
	employeeId: smallint("employee_id").primaryKey().notNull(),
	lastName: varchar("last_name", { length: 20 }).notNull(),
	firstName: varchar("first_name", { length: 10 }).notNull(),
	title: varchar({ length: 30 }),
	titleOfCourtesy: varchar("title_of_courtesy", { length: 25 }),
	birthDate: date("birth_date"),
	hireDate: date("hire_date"),
	address: varchar({ length: 60 }),
	city: varchar({ length: 15 }),
	region: varchar({ length: 15 }),
	postalCode: varchar("postal_code", { length: 10 }),
	country: varchar({ length: 15 }),
	homePhone: varchar("home_phone", { length: 24 }),
	extension: varchar({ length: 4 }),
	// TODO: failed to parse database type 'bytea'
	// photo: bytea("photo"),
	notes: text(),
	reportsTo: smallint("reports_to"),
	photoPath: varchar("photo_path", { length: 255 }),
}, (table) => [
	foreignKey({
			columns: [table.reportsTo],
			foreignColumns: [table.employeeId],
			name: "fk_employees_employees"
		}),
]);

export const products = pgTable("products", {
	productId: smallint("product_id").primaryKey().notNull(),
	productName: varchar("product_name", { length: 40 }).notNull(),
	supplierId: smallint("supplier_id"),
	categoryId: smallint("category_id"),
	quantityPerUnit: varchar("quantity_per_unit", { length: 20 }),
	unitPrice: real("unit_price"),
	unitsInStock: smallint("units_in_stock"),
	unitsOnOrder: smallint("units_on_order"),
	reorderLevel: smallint("reorder_level"),
	discontinued: integer().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.categoryId],
			foreignColumns: [categories.categoryId],
			name: "fk_products_categories"
		}),
	foreignKey({
			columns: [table.supplierId],
			foreignColumns: [suppliers.supplierId],
			name: "fk_products_suppliers"
		}),
]);

export const categories = pgTable("categories", {
	categoryId: smallint("category_id").primaryKey().notNull(),
	categoryName: varchar("category_name", { length: 15 }).notNull(),
	description: text(),
	// TODO: failed to parse database type 'bytea'
	// picture: unknown("picture"),
});

export const customerDemographics = pgTable("customer_demographics", {
	customerTypeId: varchar("customer_type_id", { length: 5 }).primaryKey().notNull(),
	customerDesc: text("customer_desc"),
});

export const territories = pgTable("territories", {
	territoryId: varchar("territory_id", { length: 20 }).primaryKey().notNull(),
	territoryDescription: varchar("territory_description", { length: 60 }).notNull(),
	regionId: smallint("region_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.regionId],
			foreignColumns: [region.regionId],
			name: "fk_territories_region"
		}),
]);

export const usStates = pgTable("us_states", {
	stateId: smallint("state_id").primaryKey().notNull(),
	stateName: varchar("state_name", { length: 100 }),
	stateAbbr: varchar("state_abbr", { length: 2 }),
	stateRegion: varchar("state_region", { length: 50 }),
});

export const customers = pgTable("customers", {
	customerId: varchar("customer_id", { length: 5 }).primaryKey().notNull(),
	companyName: varchar("company_name", { length: 40 }).notNull(),
	contactName: varchar("contact_name", { length: 30 }),
	contactTitle: varchar("contact_title", { length: 30 }),
	address: varchar({ length: 60 }),
	city: varchar({ length: 15 }),
	region: varchar({ length: 15 }),
	postalCode: varchar("postal_code", { length: 10 }),
	country: varchar({ length: 15 }),
	phone: varchar({ length: 24 }),
	fax: varchar({ length: 24 }),
});

export const orders = pgTable("orders", {
	orderId: smallint("order_id").primaryKey().notNull(),
	customerId: varchar("customer_id", { length: 5 }),
	employeeId: smallint("employee_id"),
	orderDate: date("order_date"),
	requiredDate: date("required_date"),
	shippedDate: date("shipped_date"),
	shipVia: smallint("ship_via"),
	freight: real(),
	shipName: varchar("ship_name", { length: 40 }),
	shipAddress: varchar("ship_address", { length: 60 }),
	shipCity: varchar("ship_city", { length: 15 }),
	shipRegion: varchar("ship_region", { length: 15 }),
	shipPostalCode: varchar("ship_postal_code", { length: 10 }),
	shipCountry: varchar("ship_country", { length: 15 }),
}, (table) => [
	foreignKey({
			columns: [table.customerId],
			foreignColumns: [customers.customerId],
			name: "fk_orders_customers"
		}),
	foreignKey({
			columns: [table.employeeId],
			foreignColumns: [employees.employeeId],
			name: "fk_orders_employees"
		}),
	foreignKey({
			columns: [table.shipVia],
			foreignColumns: [shippers.shipperId],
			name: "fk_orders_shippers"
		}),
]);

export const suppliers = pgTable("suppliers", {
	supplierId: smallint("supplier_id").primaryKey().notNull(),
	companyName: varchar("company_name", { length: 40 }).notNull(),
	contactName: varchar("contact_name", { length: 30 }),
	contactTitle: varchar("contact_title", { length: 30 }),
	address: varchar({ length: 60 }),
	city: varchar({ length: 15 }),
	region: varchar({ length: 15 }),
	postalCode: varchar("postal_code", { length: 10 }),
	country: varchar({ length: 15 }),
	phone: varchar({ length: 24 }),
	fax: varchar({ length: 24 }),
	homepage: text(),
});

export const employeeTerritories = pgTable("employee_territories", {
	employeeId: smallint("employee_id").notNull(),
	territoryId: varchar("territory_id", { length: 20 }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.territoryId],
			foreignColumns: [territories.territoryId],
			name: "fk_employee_territories_territories"
		}),
	foreignKey({
			columns: [table.employeeId],
			foreignColumns: [employees.employeeId],
			name: "fk_employee_territories_employees"
		}),
	primaryKey({ columns: [table.territoryId, table.employeeId], name: "pk_employee_territories"}),
]);

export const customerCustomerDemo = pgTable("customer_customer_demo", {
	customerId: varchar("customer_id", { length: 5 }).notNull(),
	customerTypeId: varchar("customer_type_id", { length: 5 }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.customerTypeId],
			foreignColumns: [customerDemographics.customerTypeId],
			name: "fk_customer_customer_demo_customer_demographics"
		}),
	foreignKey({
			columns: [table.customerId],
			foreignColumns: [customers.customerId],
			name: "fk_customer_customer_demo_customers"
		}),
	primaryKey({ columns: [table.customerTypeId, table.customerId], name: "pk_customer_customer_demo"}),
]);

export const orderDetails = pgTable("order_details", {
	orderId: smallint("order_id").notNull(),
	productId: smallint("product_id").notNull(),
	unitPrice: real("unit_price").notNull(),
	quantity: smallint().notNull(),
	discount: real().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.productId],
			foreignColumns: [products.productId],
			name: "fk_order_details_products"
		}),
	foreignKey({
			columns: [table.orderId],
			foreignColumns: [orders.orderId],
			name: "fk_order_details_orders"
		}),
	primaryKey({ columns: [table.productId, table.orderId], name: "pk_order_details"}),
]);
