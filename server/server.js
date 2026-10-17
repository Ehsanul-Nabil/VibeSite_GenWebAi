import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectToDatabase } from "./config/db.js";
import projectRouter from "./routes/projectRoutes.js";
import authRouter from "./routes/authRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";



const app = express();

await connectToDatabase();

app.use(cors({origin: process.env.ORIGINS.split(","), credentials: true}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true })); // Crucial for SSLCommerz POST callbacks

app.get("/", (req, res)=> res.send("Server is Live!"))
app.use('/api/auth',authRouter)
app.use('/api/projects',projectRouter)
app.use('/api/payment', paymentRoutes);

// Centralized error handler
app.use((err, _req, res, _next)=>{
    console.error(`[Error] ${err.message}`);
    res.status(500).json({error: err.message})
})

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`Server is running at http://localhost:${port}`)
})