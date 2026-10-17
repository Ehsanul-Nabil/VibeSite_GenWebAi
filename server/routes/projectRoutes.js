import { Router } from "express";
import { 
    createProject, 
    listProjects, 
    getProject, 
    deleteProject, 
    updateProjectFiles, 
    publishProject, 
    getPublicProject 
} from "../controllers/projectController.js";
import { authMiddleware } from "../authMiddleware/authMiddleware.js";
import { chat } from "../controllers/chatController.js";

const projectRouter = Router();

// Public Route
projectRouter.get("/public/:id", getPublicProject);

// Protect all following routes // All are authorized routes
projectRouter.use(authMiddleware);

projectRouter.post("/", createProject);
projectRouter.get("/", listProjects);
projectRouter.get("/:id", getProject);
projectRouter.delete("/:id", deleteProject);
projectRouter.put("/:id/files", updateProjectFiles);
projectRouter.post("/:id/publish", publishProject);
projectRouter.post("/:id/chat", chat);

export default projectRouter;