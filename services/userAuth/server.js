import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectToDatabase } from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import { startPaymentConsumer } from './consumers/paymentConsumer.js';
import { startCreditConsumer } from './consumers/creditConsumer.js';

const app = express();

app.use(
  cors({
    origin: (process.env.ORIGINS || "http://localhost:5173")
      .split(",")
      .map((origin) => origin.trim()),
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Moved root health check to distinct path so it won't conflict with root proxy routes
app.get("/health", (_req, res) => {
  res.json({ service: "User", status: "running" });
});

app.use((req, _res, next) => {
  console.log(`[userAuth Service] Received Request:`);
  console.log(` -> Method: ${req.method}`);
  console.log(` -> req.url: ${req.url}`);
  console.log(` -> req.originalUrl: ${req.originalUrl}`);
  next();
});

// Preserve your existing authentication URL structure
app.use("/", authRouter);

app.use((err, _req, res, _next) => {
  console.error("[User Service Error]", err.message);
  res.status(500).json({ error: "Internal server error" });
});

const port = process.env.PORT || 4001;

async function startServer() {
  try {
    await connectToDatabase();

    app.listen(port, () => {
      console.log(`User Service running on port ${port}`);

      // START CONSUMER HERE (After DB & Express HTTP server are running)
      startPaymentConsumer().catch((err) => console.error("Failed to start Payment Consumer:", err.message) );
      startCreditConsumer().catch((err) => console.error("Credit consumer error:", err.message));
    });

  } catch (error) {
    console.error("Failed to start User Service:", error.message);
    process.exit(1);
  }
}

startServer();