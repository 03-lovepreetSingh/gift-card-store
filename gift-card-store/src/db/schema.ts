import { pgTable, serial, text, varchar, timestamp, doublePrecision,numeric ,json, boolean } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";

// ----------------------------
// Users Table
// ----------------------------
export const users = pgTable("users", {
  id: varchar("id", { length: 50 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull().default(""),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  role: varchar("role", { length: 50 }).notNull().default("user"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ----------------------------
// Products Table
// ----------------------------
export const products = pgTable("products", {
  id: varchar("id", { length: 50 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  brand: varchar("brand", { length: 255 }).notNull(),
  priceUSD: doublePrecision("price_usd").notNull(),
  imageUrl: varchar("image_url", { length: 500 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ----------------------------
// Orders Table
// ----------------------------
export const orders = pgTable("orders", {
  id: varchar("id", { length: 50 }).primaryKey(),
  userId: varchar("user_id", { length: 50 }).notNull().references(() => users.id),
  products: json("products").notNull(), // store array of product ids or objects
  totalUSD: doublePrecision("total_usd").notNull(),
  status: varchar("status", { length: 50 }).notNull().default("pending"),
  txHash: varchar("tx_hash", { length: 255 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});


// ----------------------------
// Cart Table
// ----------------------------
export const carts = pgTable("carts", {
  id: varchar("id", { length: 50 }).primaryKey(),
  userId: varchar("user_id", { length: 50 }).notNull().references(() => users.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  isActive: boolean("is_active").notNull().default(true), // true if cart not yet checked out
});

// ----------------------------
// Cart Items Table (many-to-many)
// ----------------------------
export const cartItems = pgTable("cart_items", {
  id: varchar("id", { length: 50 }).primaryKey(),
  cartId: varchar("cart_id", { length: 50 }).notNull().references(() => carts.id),
  productId: varchar("product_id", { length: 50 }).notNull().references(() => products.id),
  quantity: numeric("quantity").notNull().default('1'),
  priceUSD: doublePrecision("price_usd").notNull(), // store price at the time added
});
