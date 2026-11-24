import { relations } from "drizzle-orm";
import { WorkerRoles } from "@/core/enuns/workerRole";
import {
  pgTable,
  serial,
  text,
  integer,
  numeric,
  boolean,
  pgEnum,
  timestamp,
} from "drizzle-orm/pg-core";

// Enums
export const workerRolesEnum = pgEnum("worker_roles", WorkerRoles.values());

// Helpers
const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
};

// Tables
export const clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  publicId: text("public_id").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  ...timestamps,
});

export const workers = pgTable("workers", {
  id: serial("id").primaryKey(),
  publicId: text("public_id").notNull().unique(),
  role: workerRolesEnum("role").notNull(),
  salary: numeric("salary", { precision: 10, scale: 2 }).notNull(),
  isActive: boolean("is_active").notNull().default(true),
  isAdmin: boolean("is_admin").notNull().default(false),
  ...timestamps,
});

export const workerProfiles = pgTable("worker_profiles", {
  id: serial("id").primaryKey(),
  workerId: integer("worker_id")
    .notNull()
    .references(() => workers.id, { onDelete: "cascade" }),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  phone: text("phone"),
  avatarImage: text("avatar_image"),
  ...timestamps,
});

export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id")
    .notNull()
    .references(() => clients.id, { onDelete: "cascade" }),
  fullName: text("full_name").notNull(),
  phone: text("phone"),
  avatarImage: text("avatar_image"),
  ...timestamps,
});

export const passwordResetTokens = pgTable("password_reset_tokens", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  code: text("code").notNull().unique(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// Relations
export const clientsRelations = relations(clients, ({ one }) => ({
  profile: one(profiles, {
    fields: [clients.id],
    references: [profiles.clientId],
  }),
}));

export const workersRelations = relations(workers, ({ one }) => ({
  profile: one(workerProfiles, {
    fields: [workers.id],
    references: [workerProfiles.workerId],
  }),
}));
