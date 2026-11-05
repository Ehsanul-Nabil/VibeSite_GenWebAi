
import { Router } from "express";

import {
  // login,
  logout,
  me,
  register,
  googleAuth,
  resendOtp,
  sendLoginOtp,
  verifyLoginOtp
} from "../controllers/authController.js";

import { authMiddleware } from "../authMiddleware/authMiddleware.js";

const authRouter = Router();

authRouter.post("/register", register);
// authRouter.post("/login", login);
authRouter.post("/google", googleAuth);
authRouter.post("/logout", logout);
authRouter.get("/me", authMiddleware, me);

// Otp 

authRouter.post("/resend-otp", resendOtp);
authRouter.post('/send-login-otp', sendLoginOtp)
authRouter.post('/verify-login-otp', verifyLoginOtp)



export default authRouter;


// app.get("/get-with-redis", async (req, res) => {
//     const cached = await redis.get("user:all")

//     if (cached) {
//         const user = JSON.parse(cached)
//         return res.json(user)
//     }

//     const user = await User.find({})
//     await redis.set("user:all", JSON.stringify(user))

//     return res.json(user)
// })

// app.post("/send-otp", async (req, res) => {
//     const { email } = req.body

//     const otp = Math.floor(100000 + Math.random() * 900000).toString()
//     await redis.set(`otp:${email}`, otp, "EX",30 )

//     return res.json({ otp })

// })
// app.post("/verify-otp", async (req, res) => {
//     const { email, otp } = req.body

//     const cachedOtp = await redis.get(`otp:${email}`)
//     if (!cachedOtp) {
//         return res.status(400).json({ "message": "otp not found or has been expired" })
//     }

//     if (cachedOtp != otp) {
//         return res.status(400).json({ "message": "incorrect otp" })
//     }

//     await redis.del(`otp:${email}`)
//     return res.json({ message: "otp verified" })

// })