import { Context } from "@hono/hono";
import * as projectService from "./projects.service.ts";

export const getAllProjects = async (c: Context) => {
    const projects = await projectService.getAllProjects();
    return c.json(projects);
};

export const getProjectById = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    const project = await projectService.getProjectById(id);
    if (!project) {
        return c.json({ message: "Project not found" }, 404);
    }
    return c.json(project);
};

export const createProject = async (c: Context) => {
    const project = await c.req.json();
    const newProject = await projectService.createProject(project);
    return c.json(newProject, 201);
};

export const updateProject = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    const project = await c.req.json();
    const updatedProject = await projectService.updateProject(id, project);
    if (!updatedProject) {
        return c.json({ message: "Project not found" }, 404);
    }
    return c.json(updatedProject);
};

export const deleteProject = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    const deleted = await projectService.deleteProject(id);
    if (!deleted) {
        return c.json({ message: "Project not found" }, 404);
    }
    return c.json({ message: "Project deleted successfully" });
};

export const getProjectMembers = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    const members = await projectService.getProjectMembers(id);
    return c.json(members);
};

export const addProjectMember = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    const member = await c.req.json();
    const newMember = await projectService.addProjectMember(id, member);
    return c.json(newMember, 201);
};

export const removeProjectMember = async (c: Context) => {
    const { id, memberId } = c.req.param();
    const deleted = await projectService.removeProjectMember(parseInt(id), parseInt(memberId));
    if (!deleted) {
        return c.json({ message: "Member not found" }, 404);
    }
    return c.json({ message: "Member removed successfully" });
};