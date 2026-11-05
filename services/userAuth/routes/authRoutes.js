
import { Router } from "express";

import {
  // login,
  logout,
  me,
  register,
  verifyEmail,
  googleAuth,
  resendOtp,
  sendLoginOtp,
  verifyLoginOtp
} from "../controllers/authController.js";

import { authMiddleware } from "../authMiddleware/authMiddleware.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.get('/verify-email', verifyEmail)
// authRouter.post("/login", login);
authRouter.post("/google", googleAuth);
authRouter.post("/logout", logout);
authRouter.get("/me", authMiddleware, me);

// Otp 

authRouter.post("/resend-otp", resendOtp);
authRouter.post('/send-login-otp', sendLoginOtp)
authRouter.post('/verify-login-otp', verifyLoginOtp)



export default authRouter;

