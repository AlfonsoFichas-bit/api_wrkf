import { Hono } from "@hono/hono";
import users from "./users/users.routes.ts";
import projects from "./projects/projects.routes.ts";
import sprints from "./sprints/sprints.routes.ts";
import auth from "./auth/auth.routes.ts";

const v1 = new Hono();

v1.route("/users", users);
v1.route("/projects", projects);
v1.route("/sprints", sprints);
v1.route("/auth", auth);

export default v1;