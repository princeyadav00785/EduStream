import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors()); 
app.use(express.json());

// Routes
app.use("/api/", authRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Auth Validation Service running on port ${PORT}`);
});
