import { User } from "../models/User.js";
import jwt from 'jsonwebtoken';

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

export async function register(req, res){
    const {name, email, password} = req.body

    if(!name || !email || !password){
        res.status(400).json({error: "Name, email, and password are required"})
        return;
    }

    const trimmedEmail = email.toLowerCase().trim();
    const existing = await User.findOne({email: trimmedEmail})
    if(existing){
        res.status(400).json({error: "An account with this email already exists"})
        return;
    }

    const user = await User.create({
        name,
        email: trimmedEmail,
        password
    })

    setSessionCookie(res, {userId: user._id.toString(), email: user.email})

    res.status(201).json({
        user: {
            _id: user._id,
            name: user.name,
            email: user.email
        }
    })
}

export async function login(req, res){
    const {email, password} = req.body
    console.log("hellllllloooooooooooooooo")

    if(!email || !password){
        res.status(400).json({error: "Email and password are required"})
        return;
    }

    const trimmedEmail = email.toLowerCase().trim();
    const user = await User.findOne({email: trimmedEmail})
    
    if(!user || !(await user.comparePassword(password))){
        res.status(401).json({error: "Invalid email or password"})
        return;
    }

    setSessionCookie(res, {userId: user._id.toString(), email: user.email})

    res.json({
        user: {
            _id: user._id,
            name: user.name,
            email: user.email
        }
    })
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