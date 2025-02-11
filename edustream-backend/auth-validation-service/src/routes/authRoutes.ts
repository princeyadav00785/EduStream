import { Router } from "express";
import { validateToken } from "../controllers/authController";

const router = Router();


router.post("/validate-token", validateToken);

export default router;
