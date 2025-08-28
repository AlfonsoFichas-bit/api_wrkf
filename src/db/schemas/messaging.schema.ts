import { pgTable, serial, text, timestamp, varchar, integer, boolean } from "drizzle-orm/pg-core";
import { projects } from "./projects.schema.ts";
import { users } from "../schema.ts";

export const conversations = pgTable("conversations", {
    id: serial("id").primaryKey(),
    type: varchar("type", { length: 50 }).notNull(),
    name: text("name"),
    description: text("description"),
    projectId: serial("project_id").references(() => projects.id),
    createdBy: serial("created_by").references(() => users.id),
    lastMessageAt: timestamp("last_message_at"),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const conversationMembers = pgTable("conversation_members", {
    id: serial("id").primaryKey(),
    conversationId: serial("conversation_id").references(() => conversations.id),
    userId: serial("user_id").references(() => users.id),
    joinedAt: timestamp("joined_at").defaultNow().notNull(),
    lastReadAt: timestamp("last_read_at"),
    isAdmin: boolean("is_admin").default(false),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const messages = pgTable("messages", {
    id: serial("id").primaryKey(),
    conversationId: serial("conversation_id").references(() => conversations.id),
    senderId: serial("sender_id").references(() => users.id),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const messageAttachments = pgTable("message_attachments", {
    id: serial("id").primaryKey(),
    messageId: serial("message_id").references(() => messages.id),
    fileName: text("file_name").notNull(),
    fileType: text("file_type").notNull(),
    fileSize: integer("file_size").notNull(),
    url: text("url").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const messageReadBy = pgTable("message_read_by", {
    id: serial("id").primaryKey(),
    messageId: serial("message_id").references(() => messages.id),
    userId: serial("user_id").references(() => users.id),
    readAt: timestamp("read_at").defaultNow().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});