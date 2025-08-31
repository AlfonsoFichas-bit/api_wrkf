import { db } from "../../../db/db.ts";
import { sprints } from "../../../db/schema.ts";
import { eq } from "drizzle-orm";

export const getAllSprints = async () => {
    return await db.select().from(sprints);
};

export const getSprintById = async (id: number) => {
    return await db.select().from(sprints).where(eq(sprints.id, id));
};

export const createSprint = async (sprint: any) => {
    return await db.insert(sprints).values(sprint).returning();
};

export const updateSprint = async (id: number, sprint: any) => {
    return await db.update(sprints).set(sprint).where(eq(sprints.id, id)).returning();
};

export const deleteSprint = async (id: number) => {
    return await db.delete(sprints).where(eq(sprints.id, id)).returning();
};