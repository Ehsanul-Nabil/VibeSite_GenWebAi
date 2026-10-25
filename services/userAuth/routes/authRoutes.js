
import { Router } from "express";

import {
  login,
  logout,
  me,
  register,
  googleAuth,
} from "../controllers/authController.js";

import { authMiddleware } from "../authMiddleware/authMiddleware.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/google", googleAuth);
authRouter.post("/logout", logout);
authRouter.get("/me", authMiddleware, me);

export default authRouter;
