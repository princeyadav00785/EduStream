import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { io } from "../config/socket";

const prisma = new PrismaClient();

class SessionService {
  async createSession({ title, description, instructorId }: any) {
    return await prisma.session.create({
      data: {
        id: uuidv4(),
        title,
        description,
        instructorId,
        isActive: true,
        clients: {},
        waitingList: [],
      },
    });
  }

  async joinSession(
    sessionId: string,
    clientId: string,
    userId: string,
    socketId: string
  ) {
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
    });

    if (!session) throw new Error("Session not found");

    // const user = await axios.get(`http://user-service/api/users/${userId}`).then(res => res.data);
    // if (!user) throw new Error("User not found");

    // if (user.role === "banned") {
    //   throw new Error("You are banned from joining sessions");
    // }

    let clients = session.clients as Record<
      string,
      { socketId: string; muted: boolean }
    >;
    clients[userId] = { socketId, muted: false };

    io.to(sessionId).emit("userJoined", { userId });

    return await prisma.session.update({
      where: { id: sessionId },
      data: { clients },
    });
  }

  async requestToJoinSession(sessionId: string, userId: string) {
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
    });

    if (!session) throw new Error("Session not found");

    let waitingList = session.waitingList as string[];
    if (!waitingList.includes(userId)) {
      waitingList.push(userId);
    }
    io.to(sessionId).emit("userReqToJoin", { userId });

    return await prisma.session.update({
      where: { id: sessionId },
      data: { waitingList },
    });
  }

  async approveUser(sessionId: string, userId: string) {
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
    });
    if (!session) throw new Error("Session not found");

    let waitingList = session.waitingList as string[];
    let clients = session.clients as Record<
      string,
      { socketId: string; muted: boolean }
    >;

    if (!waitingList.includes(userId))
      throw new Error("User is not in the waiting list");

    waitingList = waitingList.filter((id) => id !== userId);
    clients[userId] = { socketId: "", muted: false };

    await prisma.session.update({
      where: { id: sessionId },
      data: { waitingList, clients },
    });

    io.to(sessionId).emit("userApproved", { userId });
  }

  async toggleSessionStatus(sessionId: string) {
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
    });
    if (!session) throw new Error("Session not found");

    return await prisma.session.update({
      where: { id: sessionId },
      data: { isActive: !session.isActive },
    });
  }

  async getAllSessions() {
    return await prisma.session.findMany({ orderBy: { createdAt: "desc" } });
  }

  async getAllActiveSessions() {
    return await prisma.session.findMany({ where: { isActive: true } });
  }

  async getSessionById(sessionId: string) {
    return await prisma.session.findUnique({ where: { id: sessionId } });
  }

  async searchSessions(query: any) {
    return await prisma.session.findMany({
      where: {
        OR: [
          { title: { contains: query.title } },
          { description: { contains: query.description } },
          { instructorId: { contains: query.instructorId } },
        ],
      },
    });
  }

  async kickOutUser(sessionId: string, userId: string) {
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
    });
    if (!session) throw new Error("Session not found");

    const clients = session.clients as any;
    delete clients[userId];
    io.to(sessionId).emit("userKickedOut", { userId });

    return await prisma.session.update({
      where: { id: sessionId },
      data: { clients },
    });
  }

  async blockUser(sessionId: string, userId: string) {
    io.to(sessionId).emit("userBlocked", { userId });
    return this.kickOutUser(sessionId, userId);
  }

  async endSession(sessionId: string) {
    await prisma.session.delete({ where: { id: sessionId } });
    io.to(sessionId).emit("sessionEnded", { sessionId });
  }

  async getSessionAnalytics(sessionId: string) {
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
    });

    if (!session) throw new Error("Session not found");

    return {
      totalParticipants: session.clients ? Object.keys(session.clients).length : 0,
      sessionDuration:
        new Date().getTime() - new Date(session.createdAt).getTime(),
    };
  }

  async toggleMuteUser(sessionId: string, userId: string) {
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
    });
    if (!session) throw new Error("Session not found");

    let clients = session.clients as Record<
      string,
      { socketId: string; muted: boolean }
    >;
    if (!clients[userId]) throw new Error("User not found in session");

    clients[userId].muted = !clients[userId].muted;

    await prisma.session.update({
      where: { id: sessionId },
      data: { clients },
    });

    io
      .to(sessionId)
      .emit("userMuted", { userId, muted: clients[userId].muted });
  }

  async leaveSession(sessionId: string, userId: string) {
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
    });
    if (!session) throw new Error("Session not found");

    let clients = session.clients as Record<
      string,
      { socketId: string; muted: boolean }
    >;
    delete clients[userId];

    await prisma.session.update({
      where: { id: sessionId },
      data: { clients },
    });

    io.to(sessionId).emit("userLeft", { userId });
  }
}

export default new SessionService();
