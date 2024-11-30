import { Request, Response } from 'express';
import { createStreamService } from '../services/streamService';

const streamService = createStreamService();

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
        const { streamId } = req.body; 
        const result = await streamService.stopLiveStream(streamId);
        res.status(200).json({ message: 'Live stream stopped', result });
    } catch (error:any) {
        console.error(error);
        res.status(500).json({ message: `Could not stop live stream: ${error.message}` });
    }
};

export const recordStream = async (req: Request, res: Response) => {
    try {
        const { streamId } = req.body; 
        const recordingData = await streamService.recordStream(streamId);
        res.status(200).json({ message: 'Recording started', recordingData });
    } catch (error:any) {
        console.error(error);
        res.status(500).json({ message: `Could not start recording: ${error.message}` });
    }
};


export const addClientToStream =async (req:Request,res:Response)=>{
    try {
        const {streamId,client} = req.body;
        const clientAddedToStream = streamService.addClientToStream(streamId,client);
        res.status(200).json({ message: 'Client Added to stream', clientAddedToStream });       
    } catch (error:any) {
        res.status(500).json({ message: `Cant add client to Stream: ${error.message}` });        
    }
}

export const broadcastToStream = async (req:Request,res:Response)=>{
    try {
        const {streamId,message,sender}=req.body;
        const broadcastMsg = streamService.broadcastToStream(streamId,message,sender);
        res.status(200).json({message: 'Message Broadcast to Stream', broadcastMsg});
    } catch (error:any) {
        res.status(500).json({ message: `Cant sent Message Broadcast to Stream: ${error.message}` }); 
    }
}