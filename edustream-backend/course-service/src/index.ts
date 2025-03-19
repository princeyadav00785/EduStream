import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import courseRoutes from "./routes/courseRoutes";
// import { authMiddleware } from "./middlewares/isInstructor";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4002;


app.use(cors());
app.use(express.json());
// app.use(authMiddleware as unknown as express.RequestHandler);

// Routes
app.use("/api/courses", courseRoutes);

app.listen(PORT, () => {
    console.log(`Course Service running on port ${PORT}`);
  });