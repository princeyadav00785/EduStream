import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const validateToken = (req: Request, res: Response): void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Unauthorized: No token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string; role: string };
    res.json({ valid: true, userId: decoded.id, role: decoded.role });
  } catch (err) {
    res.status(403).json({ valid: false, error: "Invalid token" });
  }
};
