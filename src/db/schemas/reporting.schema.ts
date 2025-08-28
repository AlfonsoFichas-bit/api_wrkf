import { pgTable, serial, text, timestamp, varchar, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { projects } from "./projects.schema.ts";
import { sprints } from "./sprints.schema.ts";
import { users } from "../schema.ts";

export const reports = pgTable("reports", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description"),
    type: varchar("type", { length: 50 }).notNull(),
    projectId: serial("project_id").references(() => projects.id),
    sprintId: serial("sprint_id").references(() => sprints.id),
    userId: serial("user_id").references(() => users.id),
    startDate: timestamp("start_date"),
    endDate: timestamp("end_date"),
    includeBurndown: boolean("include_burndown"),
    includeVelocity: boolean("include_velocity"),
    includeUserMetrics: boolean("include_user_metrics"),
    includeProjectHealth: boolean("include_project_health"),
    customSections: text("custom_sections").array(),
    createdBy: serial("created_by").references(() => users.id),
    generatedAt: timestamp("generated_at").defaultNow().notNull(),
    data: jsonb("data"),
    exportFormats: text("export_formats").array(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const scheduledReports = pgTable("scheduled_reports", {
    id: serial("id").primaryKey(),
    reportConfigId: serial("report_config_id").references(() => reports.id),
    frequency: varchar("frequency", { length: 50 }).notNull(),
    nextRunTime: timestamp("next_run_time"),
    createdBy: serial("created_by").references(() => users.id),
    recipients: text("recipients").array(),
    lastRunTime: timestamp("last_run_time"),
    lastReportId: serial("last_report_id").references(() => reports.id),
    exportFormats: text("export_formats").array(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const projectMetrics = pgTable("project_metrics", {
    id: serial("id").primaryKey(),
    projectId: serial("project_id").references(() => projects.id),
    date: timestamp("date").notNull(),
    totalUserStories: integer("total_user_stories"),
    completedUserStories: integer("completed_user_stories"),
    totalPoints: integer("total_points"),
    completedPoints: integer("completed_points"),
    averageVelocity: integer("average_velocity"),
    predictedCompletion: timestamp("predicted_completion"),
    healthScore: integer("health_score"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const sprintMetrics = pgTable("sprint_metrics", {
    id: serial("id").primaryKey(),
    sprintId: serial("sprint_id").references(() => sprints.id),
    date: timestamp("date").notNull(),
    totalPoints: integer("total_points"),
    completedPoints: integer("completed_points"),
    remainingPoints: integer("remaining_points"),
    tasksCompleted: integer("tasks_completed"),
    tasksRemaining: integer("tasks_remaining"),
    idealBurndown: integer("ideal_burndown"),
    projectId: serial("project_id").references(() => projects.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const userMetrics = pgTable("user_metrics", {
    id: serial("id").primaryKey(),
    userId: serial("user_id").references(() => users.id),
    sprintId: serial("sprint_id").references(() => sprints.id),
    date: timestamp("date").notNull(),
    tasksCompleted: integer("tasks_completed"),
    pointsContributed: integer("points_contributed"),
    hoursLogged: integer("hours_logged"),
    efficiency: integer("efficiency"),
    projectId: serial("project_id").references(() => projects.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});