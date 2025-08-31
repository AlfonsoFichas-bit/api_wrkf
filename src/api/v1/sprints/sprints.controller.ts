import { Context } from "@hono/hono";
import * as sprintService from "./sprints.service.ts";

export const getAllSprints = async (c: Context) => {
    const sprints = await sprintService.getAllSprints();
    return c.json(sprints);
};

export const getSprintById = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    const sprint = await sprintService.getSprintById(id);
    if (!sprint) {
        return c.json({ message: "Sprint not found" }, 404);
    }
    return c.json(sprint);
};

export const createSprint = async (c: Context) => {
    const sprint = await c.req.json();
    const newSprint = await sprintService.createSprint(sprint);
    return c.json(newSprint, 201);
};

export const updateSprint = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    const sprint = await c.req.json();
    const updatedSprint = await sprintService.updateSprint(id, sprint);
    if (!updatedSprint) {
        return c.json({ message: "Sprint not found" }, 404);
    }
    return c.json(updatedSprint);
};

export const deleteSprint = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    const deleted = await sprintService.deleteSprint(id);
    if (!deleted) {
        return c.json({ message: "Sprint not found" }, 404);
    }
    return c.json({ message: "Sprint deleted successfully" });
};