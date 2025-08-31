import { db } from "../../../db/db.ts";
import { projects, projectMembers } from "../../../db/schema.ts";
import { eq } from "drizzle-orm";

export const getAllProjects = async () => {
    return await db.select().from(projects);
};

export const getProjectById = async (id: number) => {
    return await db.select().from(projects).where(eq(projects.id, id));
};

export const createProject = async (project: any) => {
    return await db.insert(projects).values(project).returning();
};

export const updateProject = async (id: number, project: any) => {
    return await db.update(projects).set(project).where(eq(projects.id, id)).returning();
};

export const deleteProject = async (id: number) => {
    return await db.delete(projects).where(eq(projects.id, id)).returning();
};

export const getProjectMembers = async (id: number) => {
    return await db.select().from(projectMembers).where(eq(projectMembers.projectId, id));
};

export const addProjectMember = async (projectId: number, member: any) => {
    return await db.insert(projectMembers).values({ ...member, projectId }).returning();
};

export const removeProjectMember = async (projectId: number, memberId: number) => {
    return await db.delete(projectMembers).where(eq(projectMembers.projectId, projectId)).where(eq(projectMembers.id, memberId)).returning();
};