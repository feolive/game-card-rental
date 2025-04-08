import { pgTable, text, timestamp, integer, numeric, varchar, uuid } from "drizzle-orm/pg-core";


export const category = pgTable('category', {
  id: integer('id').primaryKey(),
  code: text('code').notNull(),
  name: text('name').notNull(),
  description: varchar('description'),
  mark: integer('mark'),
  createdTime: timestamp('created_time'),
  updatedTime: timestamp('updated_time'),
});

export const gameCard = pgTable('game_card', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  inventory: integer('inventory').notNull(),
  price: numeric('price').notNull(),
  img: text('img'),
  createdTime: timestamp('created_time'),
  updatedTime: timestamp('updated_time'),
  mark: integer('mark'),
});

export const cardCategoryMapping = pgTable('card_category_mapping', {
  id: integer('id').primaryKey(),
  cardId: integer('card_id').notNull(),
  categoryId: integer('category_id').notNull(),
  createdTime: timestamp('created_time'),
});

export const order = pgTable('order', {
  id: integer('id').primaryKey(),
  customerId: integer('customer_id').notNull(),
  cost: numeric('cost').notNull(),
  createdTime: timestamp('created_time'),
  updatedTime: timestamp('updated_time'),
  mark: integer('mark'),
});

export const customer = pgTable('customer', {
  id: integer('id').primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name'),
  credits: integer('credits'),
  mark: integer('mark'),
  createdTime: timestamp('created_time'),
  updatedTime: timestamp('updated_time'),
  email: text('email'),
  description: text('description'),
  avatarAddr: text('avatar_addr'),
  authId: uuid('auth_id')
});

export const cardOrderMapping = pgTable('card_order_mapping', {
  id: integer('id').primaryKey(),
  orderId: integer('order_id').notNull(),
  cardId: integer('card_id').notNull(),
  quantity: integer('quantity').notNull(),
  createdTime: timestamp('created_time')
});

export const cart = pgTable('cart', {
  id: integer('id').primaryKey(),
  customerId: integer('customer_id').notNull(),
  totalCost: numeric('total_cost'),
  createdTime: timestamp('created_time'),
  updatedTime: timestamp('updated_time'),
  mark: integer('mark')
});

export const cartCardMapping = pgTable('cart_card_mapping', {
  id: integer('id').primaryKey(),
  cartId: integer('cart_id'),
  cardId: integer('card_id'),
  quantity: integer('quantity').notNull(),
  createdTime: timestamp('created_time')
});
  