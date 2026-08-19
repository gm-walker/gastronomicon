import * as p from 'drizzle-orm/pg-core';

export const user = p.pgTable("user", {
	id: p.text("id").primaryKey(),
	name: p.text("name").notNull(),
	email: p.varchar("email", { length: 255 }).notNull().unique(),
	emailVerified: p.boolean("email_verified").notNull(),
	createdAt: p.timestamp("created_at", { precision: 6, withTimezone: true }).notNull(),
	updatedAt: p.timestamp("updated_at", { precision: 6, withTimezone: true }).notNull(),
});

export const session = p.pgTable("session", {
	id: p.text("id").primaryKey(),
	userId: p.text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
	token: p.varchar("token", { length: 255 }).notNull().unique(),
	expiresAt: p.timestamp("expires_at", { precision: 6, withTimezone: true }).notNull(),
	createdAt: p.timestamp("created_at", { precision: 6, withTimezone: true }).notNull(),
	updatedAt: p.timestamp("updated_at", { precision: 6, withTimezone: true }).notNull(),
});

export const account = p.pgTable("account", {
	id: p.text("id").primaryKey(),
	userId: p.text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
	issuer: p.text("issuer").notNull(),
	accountId: p.text("account_id").notNull(),
	providerId: p.text("provider_id").notNull(),
	accessToken: p.text("access_token"),
	refreshToken: p.text("refresh_token"),
	accessTokenExpiresAt: p.timestamp("access_token_expires_at", { precision: 6, withTimezone: true }),
	refreshTokenExpiresAt: p.timestamp("refresh_token_expires_at", { precision: 6, withTimezone: true }),
	scope: p.text("scope"),
	idToken: p.text("id_token"),
	password: p.text("password"),
	createdAt: p.timestamp("created_at", { precision: 6, withTimezone: true }).notNull(),
	updatedAt: p.timestamp("updated_at", { precision: 6, withTimezone: true }).notNull(),
});

export const verification = p.pgTable("verification", {
	id: p.text("id").primaryKey(),
	identifier: p.text("identifier").notNull(),
	value: p.text("value").notNull(),
	expiresAt: p.timestamp("expires_at", { precision: 6, withTimezone: true }).notNull(),
	createdAt: p.timestamp("created_at", { precision: 6, withTimezone: true }).notNull(),
	updatedAt: p.timestamp("updated_at", { precision: 6, withTimezone: true }).notNull(),
});
