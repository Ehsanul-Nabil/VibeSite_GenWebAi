import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import paymentRoutes from "./routes/paymentRoutes.js";
import { connect as connectRabbitMQ } from "./config/rabbitmq.js";

const app = express();

const allowedOrigins = (process.env.ORIGINS || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim());

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

// Required for SSLCommerz form-encoded callback data
app.use(express.urlencoded({ extended: true }));

app.get("/health", (_req, res) => {
  res.status(200).json({ service: "Payment", status: "running" });
});

app.use("/", paymentRoutes);

app.use((err, _req, res, _next) => {
  console.error("[Payment Service Error]", err.message);

  res.status(500).json({
    error: "Internal server error",
  });
});

const PORT = process.env.PORT || 4003;

app.listen(PORT, async () => {
  console.log(`Payment Service running on port ${PORT}`);

  // Eagerly establish RabbitMQ connection when server starts
  try {
    await connectRabbitMQ();
  } catch (err) {
    console.error("[Payment Service] Failed to connect to RabbitMQ on startup:", err.message);
  }
});