
import "dotenv/config";
import express from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

const origins = (process.env.ORIGINS || "http://localhost:5173").split(",").map((origin) => origin.trim());

app.use(
  cors({
    origin: origins,
    credentials: true,
  })
);

// Gateway health check
app.get("/", (_req, res) => {
  res.send("API Gateway is Live!");
});

// // User / Authentication Service
// app.use("/api/auth",createProxyMiddleware({
//     target: process.env.USER_SERVICE_URL,
//     changeOrigin: true,
//   })
// );


// User / Authentication Service
app.use(
  "/api/auth",
  (req, _res, next) => {
    console.log(`[Gateway] Proxying ${req.method} request from ${req.originalUrl} -> ${process.env.USER_SERVICE_URL}`);
    next();
  },
  createProxyMiddleware({
    target: process.env.USER_SERVICE_URL,
    changeOrigin: true,
    onError: (err, req, res) => {
      console.error(`[Gateway Proxy Error] Failed to reach User Service at ${process.env.USER_SERVICE_URL}:`, err.message);
      res.status(502).json({ error: "User Service unavailable" });
    },
  })
);

// Project Service
app.use("/api/projects",createProxyMiddleware({
  target: process.env.PROJECT_SERVICE_URL,
  changeOrigin: true,
  }
));

// Payment Service
app.use("/api/payment",createProxyMiddleware({
  target: process.env.PAYMENT_SERVICE_URL,
  changeOrigin: true,
  }
));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`API Gateway running at http://localhost:${port}`);
});
