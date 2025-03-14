import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import paymentRoutes from "./routes/payment-routes";
import { stripeWebhook } from "./controllers/payment-controller";

dotenv.config();

const app = express();
app.post(
  "/api/payment/webhook",
  express.raw({ type: "application/json" }), // ✅ This ensures raw buffer is passed
  stripeWebhook
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
      origin: "*", 
      methods: "GET,POST,PUT,DELETE",
      allowedHeaders: "Content-Type,Authorization",
    })
  );

app.use("/api/payment", paymentRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Payment Service running on port ${PORT}`));
