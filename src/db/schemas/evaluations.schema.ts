import { pgTable, serial, text, timestamp, varchar, integer, boolean } from "drizzle-orm/pg-core";
import { projects } from "./projects.schema.ts";
import { users } from "../schema.ts";
import { tasks } from "./tasks.schema.ts";

export const rubrics = pgTable("rubrics", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    projectId: serial("project_id").references(() => projects.id),
    createdBy: serial("created_by").references(() => users.id),
    isTemplate: boolean("is_template").default(false),
    status: varchar("status", { length: 50 }).notNull().default("draft"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const rubricCriteria = pgTable("rubric_criteria", {
    id: serial("id").primaryKey(),
    rubricId: serial("rubric_id").references(() => rubrics.id),
    name: text("name").notNull(),
    description: text("description"),
    maxPoints: integer("max_points").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const rubricCriterionLevels = pgTable("rubric_criterion_levels", {
    id: serial("id").primaryKey(),
    criterionId: serial("criterion_id").references(() => rubricCriteria.id),
    description: text("description").notNull(),
    pointValue: integer("point_value").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const evaluations = pgTable("evaluations", {
    id: serial("id").primaryKey(),
    deliverableId: serial("deliverable_id").references(() => tasks.id),
    evaluatorId: serial("evaluator_id").references(() => users.id),
    studentId: serial("student_id").references(() => users.id),
    rubricId: serial("rubric_id").references(() => rubrics.id),
    overallFeedback: text("overall_feedback"),
    totalScore: integer("total_score").notNull(),
    maxPossibleScore: integer("max_possible_score").notNull(),
    status: varchar("status", { length: 50 }).notNull().default("draft"),
    evaluatedAt: timestamp("evaluated_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const criterionEvaluations = pgTable("criterion_evaluations", {
    id: serial("id").primaryKey(),
    evaluationId: serial("evaluation_id").references(() => evaluations.id),
    criterionId: serial("criterion_id").references(() => rubricCriteria.id),
    score: integer("score").notNull(),
    feedback: text("feedback"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const attachments = pgTable("attachments", {
    id: serial("id").primaryKey(),
    deliverableId: serial("deliverable_id").references(() => tasks.id),
    fileName: text("file_name").notNull(),
    fileType: text("file_type").notNull(),
    fileSize: integer("file_size").notNull(),
    url: text("url").notNull(),
    uploadedBy: serial("uploaded_by").references(() => users.id),
    uploadedAt: timestamp("uploaded_at").defaultNow().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});