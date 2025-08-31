import { Hono } from "@hono/hono";
import * as projectController from "./projects.controller.ts";

const projects = new Hono();

projects.get("/", projectController.getAllProjects);
projects.get("/:id", projectController.getProjectById);
projects.post("/", projectController.createProject);
projects.put("/:id", projectController.updateProject);
projects.delete("/:id", projectController.deleteProject);

projects.get("/:id/members", projectController.getProjectMembers);
projects.post("/:id/members", projectController.addProjectMember);
projects.delete("/:id/members/:memberId", projectController.removeProjectMember);

export default projects;