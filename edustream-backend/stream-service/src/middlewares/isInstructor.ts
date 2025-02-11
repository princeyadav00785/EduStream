import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
const axios = require('axios');

const prisma = new PrismaClient();

export const isInstructor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { sessionId } = req.params;
    const userId = req.body.userId || req.query.userId;

    try {
        const session = await prisma.session.findUnique({ where: { id: sessionId } });

        if (!session) {
            res.status(404).json({ message: 'Session not found' });
            return;
        }

        if (session.instructorId !== userId) {
            res.status(403).json({ message: 'Unauthorized: Only the instructor can perform this action' });
            return;
        }

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Error in isInstructor middleware:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const authMiddleware = async ({req, res, next}:any) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    //  will Call the Auth Validation Microservice, would going to add this in all microservice...
    const response = await axios.post(
      "http://auth-service:5004/api/validate-token", 
      {}, 
      { headers: { Authorization: token } }
    );

    if (response.data.valid) {
      req.user = { id: response.data.userId, role: response.data.role }; 
      next();
    } else {
      res.status(403).json({ error: "Invalid token" });
    }
  } catch (err) {
    res.status(403).json({ error: "Token validation failed" });
  }
};

module.exports = authMiddleware;
