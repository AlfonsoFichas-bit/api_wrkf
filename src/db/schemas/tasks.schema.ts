import { pgTable, serial, text, timestamp, varchar, integer, boolean } from "drizzle-orm/pg-core";
import { userStories } from "./user_stories.schema.ts";
import { users } from "../schema.ts";

export const tasks = pgTable("tasks", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description"),
    userStoryId: serial("user_story_id").references(() => userStories.id),
    status: varchar("status", { length: 50 }).notNull().default("todo"),
    assignedTo: serial("assigned_to").references(() => users.id),
    estimatedHours: integer("estimated_hours"),
    spentHours: integer("spent_hours"),
    isDeliverable: boolean("is_deliverable").default(false),
    createdBy: serial("created_by").references(() => users.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const taskHistory = pgTable("task_history", {
    id: serial("id").primaryKey(),
    taskId: serial("task_id").references(() => tasks.id),
    userId: serial("user_id").references(() => users.id),
    type: varchar("type", { length: 50 }).notNull(),
    field: text("field"),
    oldValue: text("old_value"),
    newValue: text("new_value"),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const taskComments = pgTable("task_comments", {
    id: serial("id").primaryKey(),
    taskId: serial("task_id").references(() => tasks.id),
    userId: serial("user_id").references(() => users.id),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});