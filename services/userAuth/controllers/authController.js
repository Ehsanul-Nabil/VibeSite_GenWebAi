import { User } from "../models/User.js";
import jwt from 'jsonwebtoken';
import {redisClient as redis} from '../config/redis.js' // or redisClient according to your export
import nodemailer from 'nodemailer'
import crypto from 'crypto'
import { sendVerificationEmail } from '../utils/sendEmail.js'

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret"

// Helper to set cookie
const setSessionCookie = (res, payload)=>{
    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "30d"})
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        path: "/",
    })
}


// const transporter = nodemailer.createTransport({
//   service: 'gmail', // Or use host/port for custom SMTP (Resend, SendGrid, Mailtrap)
//   auth: {
//     user: process.env.EMAIL_USER, // Your sender email
//     pass: process.env.EMAIL_PASS  // App password generated from Google/SMTP provider
//   }
// })

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Force SSL/TLS on port 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  // Set explicit timeouts to prevent Render from hanging indefinitely
  connectionTimeout: 10000, // 10 seconds to connect
  greetingTimeout: 5000,    // 5 seconds for SMTP greeting
  socketTimeout: 10000,     // 10 seconds for socket activity
});

export const sendOtpEmail = async (toEmail, otp) => {
  const mailOptions = {
    from: `"VibeSite Studio" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: 'Your VibeSite Verification Code',
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #0b0b0b; color: #ffffff; padding: 30px; borderRadius: 16px;">
        <h2 style="color: #a855f7;">VibeSite.AI Verification</h2>
        <p style="color: #cbd5e1; font-size: 14px;">Use the following 6-digit code to complete your sign-in process:</p>
        <div style="background-color: #111622; border: 1px solid #1e293b; display: inline-block; padding: 12px 24px; border-radius: 12px; margin: 16px 0;">
          <span style="font-size: 28px; font-weight: bold; letter-spacing: 6px; color: #38bdf8;">${otp}</span>
        </div>
        <p style="color: #64748b; font-size: 12px;">This code expires in 5 minutes. If you did not request this code, please ignore this email.</p>
      </div>
    `
  }

  await transporter.sendMail(mailOptions)
}



// export async function register(req, res){
//     const {name, email, password} = req.body

//     if(!name || !email || !password){
//         res.status(400).json({error: "Name, email, and password are required"})
//         return;
//     }

//     const trimmedEmail = email.toLowerCase().trim();
//     const existing = await User.findOne({email: trimmedEmail})
//     if(existing){
//         res.status(400).json({error: "An account with this email already exists"})
//         return;
//     }

//     const user = await User.create({
//         name,
//         email: trimmedEmail,
//         password
//     })

//     setSessionCookie(res, {userId: user._id.toString(), email: user.email})

//     res.status(201).json({
//         user: {
//             _id: user._id,
//             name: user.name,
//             email: user.email
//         }
//     })
// }

// export async function login(req, res){
//     const {email, password} = req.body
//     console.log("hellllllloooooooooooooooo")

//     if(!email || !password){
//         res.status(400).json({error: "Email and password are required"})
//         return;
//     }

//     const trimmedEmail = email.toLowerCase().trim();
//     const user = await User.findOne({email: trimmedEmail})
    
//     if(!user || !(await user.comparePassword(password))){
//         res.status(401).json({error: "Invalid email or password"})
//         return;
//     }

//     setSessionCookie(res, {userId: user._id.toString(), email: user.email})

//     res.json({
//         user: {
//             _id: user._id,
//             name: user.name,
//             email: user.email
//         }
//     })
// }




export async function register(req, res) {
    try {
        console.log("inside the register ")
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ error: "Name, email, and password are required" })
        }

        const trimmedEmail = email.toLowerCase().trim()
        const existing = await User.findOne({ email: trimmedEmail })
        
        if (existing) {
            return res.status(400).json({ error: "An account with this email already exists" })
        }

        // 1. Create user with active: false (default in schema)
        const user = await User.create({
            name,
            email: trimmedEmail,
            password
        })

        // 2. Generate random verification token
        const token = crypto.randomBytes(32).toString('hex')

        // 3. Store in Redis for 24 hours (86400 seconds)
        await redis.set(`verify:${token}`, trimmedEmail, "EX", 86400)

        // 4. Send verification email link
        await sendVerificationEmail(trimmedEmail, token)

        // 5. Respond with instructions to check email (No session cookie set here)
        return res.status(201).json({
            success: true,
            message: "Registration successful! Please check your email to verify your account."
        })
    } catch (error) {
        console.error("Register Error:", error)
        return res.status(500).json({ error: "Registration failed" })
    }
}



export async function verifyEmail(req, res) {
    try {
        const { token } = req.query

        if (!token) {
            return res.status(400).json({ error: "Invalid or missing token" })
        }

        // 1. Look up token in Redis
        const email = await redis.get(`verify:${token}`)

        if (!email) {
            return res.status(400).json({ error: "Verification token is invalid or has expired" })
        }

        // 2. Set active: true in MongoDB
        const user = await User.findOneAndUpdate(
            { email },
            { active: true },
            { new: true }
        )

        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }

        // 3. Delete used token from Redis
        await redis.del(`verify:${token}`)

        // 4. Redirect to Frontend login page/modal
        const frontendLoginUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}?verified=true`
        return res.redirect(frontendLoginUrl)

    } catch (error) {
        console.error("Verify Email Error:", error)
        return res.status(500).json({ error: "Email verification failed" })
    }
}

export async function sendLoginOtp(req, res) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" })
    }

    const trimmedEmail = email.toLowerCase().trim()
    const user = await User.findOne({ email: trimmedEmail })

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid email or password" })
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    // Store OTP in Redis for 300 seconds (5 mins)
    await redis.set(`otp:${trimmedEmail}`, otp, "EX", 300)

    // Send email to user
    await sendOtpEmail(trimmedEmail, otp)

    return res.json({ 
      success: true, 
      message: "OTP sent to your email address" 
    })
  } catch (error) {
    console.error("sendLoginOtp Error:", error)
    return res.status(500).json({ error: "Failed to send OTP" })
  }
}


export async function verifyLoginOtp(req, res) {
    try {
        const { email, otp } = req.body

        if (!email || !otp) {
            return res.status(400).json({ error: "Email and OTP are required" })
        }

        const trimmedEmail = email.toLowerCase().trim()

        // Fetch cached OTP from Redis
        const cachedOtp = await redis.get(`otp:${trimmedEmail}`)

        if (!cachedOtp) {
            return res.status(400).json({ error: "OTP not found or has expired" })
        }

        if (cachedOtp !== otp.toString().trim()) {
            return res.status(400).json({ error: "Incorrect OTP code" })
        }

        // OTP is valid -> delete from Redis immediately so it cannot be reused
        await redis.del(`otp:${trimmedEmail}`)

        const user = await User.findOne({ email: trimmedEmail })
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }

        // Set session cookie / JWT
        setSessionCookie(res, { userId: user._id.toString(), email: user.email })

        return res.json({
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        console.error("verifyLoginOtp Error:", error)
        return res.status(500).json({ error: "OTP verification failed" })
    }
}

export async function resendOtp(req, res) {
    try {
        const { email } = req.body

        if (!email) {
            return res.status(400).json({ error: "Email is required to resend OTP" })
        }

        const trimmedEmail = email.toLowerCase().trim()
        const user = await User.findOne({ email: trimmedEmail })

        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }

        // Generate a new 6-digit OTP
        const newOtp = Math.floor(100000 + Math.random() * 900000).toString()

        // Overwrite existing key in Redis and reset expiration to 300 seconds
        await redis.set(`otp:${trimmedEmail}`, newOtp, "EX", 300)

        // TODO: Send new OTP via Nodemailer / SendGrid / Console log
        console.log(`[RESENT NEW OTP TO ${trimmedEmail}]: ${newOtp}`)

        return res.json({ 
            success: true, 
            message: "A new OTP code has been sent to your email" 
        })
    } catch (error) {
        console.error("resendOtp Error:", error)
        return res.status(500).json({ error: "Failed to resend OTP" })
    }
}



export async function googleAuth(req, res) {
    const { name, email, avatar } = req.body;

    if (!email) {
        res.status(400).json({ error: "Email is required" });
        return;
    }

    const trimmedEmail = email.toLowerCase().trim();

    // Find existing user or register a new one without password
    let user = await User.findOne({ email: trimmedEmail });

    if (!user) {
        user = await User.create({
            name: name || "Google User",
            email: trimmedEmail,
            avatar: avatar || "",
            // password is left undefined since it is no longer required
        });
    } else if (avatar && !user.avatar) {
        // Optional: Update avatar if missing on existing user
        user.avatar = avatar;
        await user.save();
    }

    setSessionCookie(res, { userId: user._id.toString(), email: user.email });

    res.json({
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            credits: user.credits
        }
    });
}


export async function logout(_req, res){
    res.cookie("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 0,
        path: "/",
    })
    res.json({success: true})
}

export async function me(req, res){
    if (!req.user) {
        res.status(401).json({error: "Not authenticated"})
        return;
    }

    const user = await User.findById(req.user.userId).select("-password");
    if(!user){
        res.status(404).json({ error: "User not found" });
        return;
    }
    res.json({user})
}



// import { subscribeToQueue } from "../config/rabbitmq.js";

// export async function startPaymentConsumer() {
//   await subscribeToQueue("payment.completed", async (message) => {
//     const event = JSON.parse(message);

//     const { userId, plan, credits } = event;

//     if (
//       !userId ||!["pro", "enterprise"].includes(plan) ||!Number.isInteger(credits) ||credits <= 0) {
//       throw new Error("Invalid payment event");
//     }

//     const user = await User.findByIdAndUpdate(
//       userId,
//       {
//         $inc: { credits },
//         $set: { plan },
//       },
//       { new: true, runValidators: true }
//     );

//     if (!user) {
//       throw new Error(`User not found: ${userId}`);
//     }

//     console.log(`Updated credits and plan for user ${userId}`);
//   });
// }