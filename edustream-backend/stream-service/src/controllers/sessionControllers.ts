import { Request, Response } from 'express';
import sessionService from '../services/sessionService';

export const createSession = async (req: Request, res: Response) => {
    try {
        const session = await sessionService.createSession(req.body);
        res.status(201).json({ message: 'Session created', session });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Could not create session' });
    }
};

export const endSession = async (req: Request, res: Response) => {
    try {
        await sessionService.endSession(req.params.sessionId);
        res.status(200).json({ message: 'Session ended' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Could not end session' });
    }
};
