import express from "express";
import { createPayment ,getPaymentStatus, stripeWebhook} from "../controllers/payment-controller";

const router = express.Router();


router.post("/pay", createPayment);
router.post("/webhook",stripeWebhook);
router.get("/payment-status", getPaymentStatus);


export default router;
