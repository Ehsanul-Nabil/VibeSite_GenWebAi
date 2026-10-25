
import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectToDatabase } from "./config/db.js";
import { connectRabbitMQ } from "./config/rabbitmq.js"; 
import projectRouter from "./routes/projectRoutes.js";

const app = express();

// Middleware
app.use(
    cors({
        origin: process.env.ORIGINS ? process.env.ORIGINS.split(",").map(origin => origin.trim()): "http://localhost:5173",
        credentials: true,
    })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/health", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "Project Service is running!",
    });
});


// app.use((req, _res, next) => {
//   console.log(`[project Service] Received Request:`);
//   console.log(` -> Method: ${req.method}`);
//   console.log(` -> req.url: ${req.url}`);
//   console.log(` -> req.originalUrl: ${req.originalUrl}`);
//   next();
// });
// Project routes
app.use("/", projectRouter);


// Error handler
app.use((err, _req, res, _next) => {
    console.error("[Project Service Error]", err);

    res.status(err.status || 500).json({
        error: err.message || "Internal Server Error",
    });
});

// Start server after database connection
const PORT = process.env.PORT || 4002;

async function startServer() {
    try {
        await connectToDatabase();
    // Connect RabbitMQ before starting HTTP server
        await connectRabbitMQ();

        app.listen(PORT, () => {
            console.log(`Project Service running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start Project Service:", error);
        process.exit(1);
    }
}

startServer();
