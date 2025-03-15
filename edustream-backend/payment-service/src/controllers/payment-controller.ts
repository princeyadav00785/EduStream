import { Request, Response, RequestHandler } from "express";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: "2025-02-24.acacia" });
const prismaAny = prisma as any;

export const createPayment: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  console.log(`${process.env.COURSE_API_URL}/api/courses/enroll`);
  try {
    const { userId, courseId, amount, name, email, address } = req.body;

    if (!userId || !courseId || !amount || !name || !email || !address) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const customer = await stripe.customers.create({
      name,
      email,
      address: {
        line1: address.line1,
        line2: address.line2 || "",
        city: address.city,
        state: address.state,
        postal_code: address.postal_code,
        country: "IN",
      },
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer: customer.id,
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Course Purchase",
            },
            unit_amount: amount * 100, 
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: userId,
        courseId: courseId,
        username: name,
      },    
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/payment-sucess/{CHECKOUT_SESSION_ID}`, 
      // success_url: `http://localhost:3000/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-failed/{CHECKOUT_SESSION_ID}`,
    });
    

    // console.log("Stripe session created:", session);

    try {
        await prismaAny.payment.create({
        data: { userId, courseId, amount, status: "PENDING", stripeCustomerId: customer.id },
      });
    } catch (error: any) {
      console.error("Prisma error:", error);
      res.status(500).json({ error: "Database operation failed", details: error.message });
      return;
    }

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ error: "Payment failed" });
  }
};


export const stripeWebhook: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const sig = req.headers["stripe-signature"];

  if (!sig) {
     res.status(400).send("Stripe signature missing");
     return;
  }

  let event: Stripe.Event;
  try {
    // console.log(req.body , sig, process.env.STRIPE_WEBHOOK_SECRET);
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    console.error("⚠️ Webhook signature verification failed.", err.message);
     res.status(400).send(`Webhook error: ${err.message}`);
     return;
  }

  // console.log("Webhook Event:", event);s

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log(session);
    const userId = session?.metadata?.userId;
    const courseId = session?.metadata?.courseId;
    const username = session?.metadata?.username;


    const stripeCustomerId = session.customer as string;

    try {
      const payment = await prisma.payment.findFirst({
        where: { stripeCustomerId, status: "PENDING" },
      });

      if (!payment) {
        console.error("⚠️ No matching pending payment found.");
         res.status(404).json({ error: "Payment not found" });
         return;
      }
      // console.log(`payment details : ${payment}`);
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: "SUCCESSFUL" },
      });
      try {

       const data= await axios.post(`${process.env.COURSE_API_URL}/api/courses/enroll`, {
          userId,
          courseId,
          username,
        });
        console.log(data);
      } catch (error) {
        console.error("Cant send data to course api.",error);
      }
      // console.log(`✅ Payment ${payment.id} marked as SUCCESSFUL.`);
    } catch (error) {
      console.error("⚠️ Database update failed:", error);
      res.status(500).json({ error: "Database update failed" });
      return;
    }

  }

  res.status(200).json({ received: true });
};


export const getPaymentStatus: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { session_id } = req.query;

    if (!session_id) {
      res.status(400).json({ error: "Session ID is required" });
      return;
    }

    const session = await stripe.checkout.sessions.retrieve(session_id as string);

    if (!session) {
      res.status(404).json({ error: "Session not found" });
      return;
    }

    const paymentData = {
      id: session.id,
      amount: session.amount_total,
      currency: session.currency,
      status: session.payment_status,
      customer: session.customer_details,
    };
    res.status(200).send({paymentData :paymentData});
  
    // res.redirect(`http://localhost:3000/payment-success?session_id=${session_id}`);

  } catch (error) {
    console.error("Error retrieving payment session:", error);
    res.status(500).json({ error: "Failed to retrieve payment session" });
  }
};
