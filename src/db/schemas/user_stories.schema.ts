import { pgTable, serial, text, timestamp, varchar, integer } from "drizzle-orm/pg-core";
import { projects } from "./projects.schema.ts";
import { sprints } from "./sprints.schema.ts";
import { users } from "../schema.ts";

export const userStories = pgTable("user_stories", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    acceptanceCriteria: text("acceptance_criteria").notNull(),
    priority: varchar("priority", { length: 50 }).notNull().default("medium"),
    status: varchar("status", { length: 50 }).notNull().default("backlog"),
    points: integer("points"),
    projectId: serial("project_id").references(() => projects.id),
    sprintId: serial("sprint_id").references(() => sprints.id),
    createdBy: serial("created_by").references(() => users.id),
    assignedTo: serial("assigned_to").references(() => users.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});