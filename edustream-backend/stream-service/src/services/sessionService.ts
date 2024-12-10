import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

interface SessionData {
  title: string;
  instructorId: string;
  startTime: Date;
  endTime?: Date;
  isActive: boolean;
  participants?: string[];
}

class SessionService {
  async createSession(sessionData: SessionData) {
    try {
      const sessionId = uuidv4();
      const session = await prisma.session.create({
        data: {
          id: sessionId,
          ...sessionData,
          isActive: true,
        },
      });
      return session;
    } catch (error) {
      console.error('Error creating session:', error);
      throw new Error('Failed to create session');
    }
  }

  async getSessionById(sessionId: string) {
    try {
      const session = await prisma.session.findUnique({
        where: { id: sessionId },
      });
      if (!session) throw new Error('Session not found');
      return session;
    } catch (error) {
      console.error('Error fetching session:', error);
      throw error;
    }
  }

  async endSession(sessionId: string) {
    try {
      const session = await prisma.session.update({
        where: { id: sessionId },
        data: { isActive: false, endTime: new Date() },
      });
      return session;
    } catch (error) {
      console.error('Error ending session:', error);
      throw new Error('Failed to end session');
    }
  }

  async getAllActiveSessions() {
    try {
      const sessions = await prisma.session.findMany({
        where: { isActive: true },
      });
      return sessions;
    } catch (error) {
      console.error('Error fetching active sessions:', error);
      throw new Error('Failed to fetch active sessions');
    }
  }
}

export default new SessionService();
