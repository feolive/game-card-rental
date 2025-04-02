import { pgTable,serial, text, timestamp, integer, numeric, varchar } from "drizzle-orm/pg-core";


export const category = pgTable('category', {
  id: serial('id').primaryKey(),
  code: text('code').notNull(),
  name: text('name').notNull(),
  description: varchar('description'),
  createdTime: timestamp('created_time').defaultNow(),
  updatedTime: timestamp('updated_time').defaultNow(),
});

export const gameCard = pgTable('game_card', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  inventory: integer('inventory').notNull(),
  createdTime: timestamp('created_time').defaultNow(),
  updatedTime: timestamp('updated_time').defaultNow(),
});

export const cardCategory = pgTable('card_category', {
  id: integer('id').primaryKey(),
  gameId: integer('game_id').notNull(),
  categoryId: integer('category_id').notNull(),
  createdTime: timestamp('created_time').defaultNow(),
});

export const order = pgTable('order', {
  id: integer('id').primaryKey(),
  customerId: integer('customer_id').notNull(),
  cost: numeric('cost').notNull(),
  createTime: timestamp('create_time').defaultNow(),
  updateTime: timestamp('update_time').defaultNow(),
});

export const customer = pgTable('customer', {
  id: serial('id').primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name'),
  credits: integer('credits'),
  createdTime: timestamp('created_time'),
  updateTime: timestamp('update_time'),
  description: text('description'),
  avatarAddr: text('avatar_addr'),
});

export const cardOrder = pgTable('card_order', {
  id: integer('id').primaryKey(),
  orderId: integer('order_id').notNull(),
  cardId: integer('game_id').notNull(),
  quantity: integer('quantity').notNull(),
  createdTime: timestamp('created_time').defaultNow()
});