import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { projects } from "./projects.schema.ts";
import { users } from "../schema.ts";

export const sprints = pgTable("sprints", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    goal: text("goal"),
    projectId: serial("project_id").references(() => projects.id),
    status: varchar("status", { length: 50 }).notNull().default("planned"),
    startDate: timestamp("start_date"),
    endDate: timestamp("end_date"),
    createdBy: serial("created_by").references(() => users.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});