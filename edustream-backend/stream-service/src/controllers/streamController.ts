import { Request, Response } from 'express';
import streamService from '../services/streamService';

export const startLiveStream = async (req: Request, res: Response) => {
    try {
        const streamData = await streamService.startLiveStream();
        res.status(200).json({ message: 'Live stream started', streamData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Could not start live stream' });
    }
};

export const stopLiveStream = async (req: Request, res: Response) => {
    try {
        await streamService.stopLiveStream();
        res.status(200).json({ message: 'Live stream stopped' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Could not stop live stream' });
    }
};

export const recordStream = async (req: Request, res: Response) => {
    try {
        const recordingData = await streamService.recordStream();
        res.status(200).json({ message: 'Recording started', recordingData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Could not start recording' });
    }
};
