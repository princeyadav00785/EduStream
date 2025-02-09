import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

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
