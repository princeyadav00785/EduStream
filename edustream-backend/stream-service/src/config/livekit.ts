import { AccessToken, VideoGrant } from 'livekit-server-sdk';
import dotenv from 'dotenv';

dotenv.config();

const LIVEKIT_API_KEY = process.env.LIVEKIT_API_KEY!;
const LIVEKIT_API_SECRET = process.env.LIVEKIT_API_SECRET!;
const LIVEKIT_URL = process.env.LIVEKIT_URL!;

/**
 * Generates a LiveKit JWT token for a user to join a session with optional recording permissions.
 * @param {string} userId - User's unique ID.
 * @param {string} sessionId - Room (session) ID in LiveKit.
 * @param {boolean} includeRecording - If true, grants recording (roomRecord) permissions.
 * @returns {string} - JWT token for authentication.
 */
export const generateLiveKitToken = async (userName: string, sessionId: string, includeRecording = false): Promise<string> => {
    const videoGrant: VideoGrant = {
        roomJoin: true,
        room: sessionId,
    };
    // If recording is needed, grant recording permissions
    if (includeRecording) {
        videoGrant.roomRecord = true;
    }

    const token = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET, { identity: userName });
    token.addGrant(videoGrant);

    return await token.toJwt();
};

export { LIVEKIT_URL };
