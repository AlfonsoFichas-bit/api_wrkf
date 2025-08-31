import { Hono } from "@hono/hono";
import * as sprintController from "./sprints.controller.ts";

const sprints = new Hono();

sprints.get("/", sprintController.getAllSprints);
sprints.get("/:id", sprintController.getSprintById);
sprints.post("/", sprintController.createSprint);
sprints.put("/:id", sprintController.updateSprint);
sprints.delete("/:id", sprintController.deleteSprint);

export default sprints;