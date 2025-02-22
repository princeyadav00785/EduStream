import { AccessToken } from 'livekit-server-sdk';
import dotenv from 'dotenv';

dotenv.config();

const LIVEKIT_API_KEY = process.env.LIVEKIT_API_KEY!;
const LIVEKIT_API_SECRET = process.env.LIVEKIT_API_SECRET!;
const LIVEKIT_URL = process.env.LIVEKIT_URL!;

/**
 * we will generates a LiveKit JWT token for a user to join a session.
 * @param {string} userId - User's unique ID(validation service se).
 * @param {string} sessionId - Room (session) ID in LiveKit.
 * @returns {string} - JWT token for authentication.
 */
export const generateLiveKitToken = async (userId: string, sessionId: string): Promise<string> => {
    const token = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET, { identity: userId });
    token.addGrant({ roomJoin: true, room: sessionId });

    return await token.toJwt() as string;
};

export { LIVEKIT_URL };
