import { Server as WebSocketServer } from 'ws';
import { v4 as uuidv4 } from 'uuid';

interface Stream {
    streamId: string;
    clients: Set<WebSocket>;
    status: 'started' | 'stopped';
}

interface Recording {
    recordingId: string;
    status: 'recording started' | 'stopped';
}

export const createStreamService = () => {
    const streams: Map<string, Stream> = new Map();
    const recordings: Map<string, Recording> = new Map();

    const startLiveStream = async (): Promise<{ streamId: string; status: string }> => {
        const streamId = uuidv4();
        streams.set(streamId, { streamId, clients: new Set(), status: 'started' });
        console.log(`Live stream started with ID: ${streamId}`);
        return { streamId, status: 'started' };
    };

    const stopLiveStream = async (streamId: string): Promise<{ streamId: string; status: string }> => {
        const stream = streams.get(streamId);
        if (!stream) {
            throw new Error(`Stream with ID ${streamId} not found`);
        }
        stream.status = 'stopped';
        streams.delete(streamId);
        console.log(`Live stream stopped with ID: ${streamId}`);
        return { streamId, status: 'stopped' };
    };

    const recordStream = async (streamId: string): Promise<{ recordingId: string; status: string }> => {
        const stream = streams.get(streamId);
        if (!stream) {
            throw new Error(`Stream with ID ${streamId} not found`);
        }

        const recordingId = uuidv4();
        recordings.set(recordingId, { recordingId, status: 'recording started' });
        console.log(`Recording started for stream ID: ${streamId} with recording ID: ${recordingId}`);
        return { recordingId, status: 'recording started' };
    };

    const addClientToStream = (streamId: string, client: WebSocket): void => {
        const stream = streams.get(streamId);
        if (!stream) {
            throw new Error(`Stream with ID ${streamId} not found`);
        }
        stream.clients.add(client);
        console.log(`Client added to stream ID: ${streamId}`);
    };

    const broadcastToStream = (streamId: string, message: string, sender?: WebSocket): void => {
        const stream = streams.get(streamId);
        if (!stream) {
            throw new Error(`Stream with ID ${streamId} not found`);
        }
        stream.clients.forEach((client) => {
            if (client !== sender && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    };

    return {
        startLiveStream,
        stopLiveStream,
        recordStream,
        addClientToStream,
        broadcastToStream,
    };
};
