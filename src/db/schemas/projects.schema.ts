import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { users } from "../schema.ts";

export const projects = pgTable("projects", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    status: varchar("status", { length: 50 }).notNull().default("planning"),
    startDate: timestamp("start_date"),
    endDate: timestamp("end_date"),
    createdBy: serial("created_by").references(() => users.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const projectMembers = pgTable("project_members", {
    id: serial("id").primaryKey(),
    userId: serial("user_id").references(() => users.id),
    projectId: serial("project_id").references(() => projects.id),
    role: varchar("role", { length: 50 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});