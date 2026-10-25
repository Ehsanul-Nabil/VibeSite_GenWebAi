import express from "express";
import paymentController from "../controllers/paymentController.js";
import { authMiddleware } from "../authMiddleware/authMiddleware.js";

const router = express.Router();

// Authenticated user initiates a payment
router.post("/initiate",authMiddleware,paymentController.initiatePayment);

// SSLCommerz callbacks
router.post("/success", paymentController.paymentSuccess);
router.post("/fail", paymentController.paymentFail);
router.post("/cancel", paymentController.paymentCancel);

export default router;
