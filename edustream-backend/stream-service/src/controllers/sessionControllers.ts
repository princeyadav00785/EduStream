import { Request, Response } from "express";
import sessionService from "../services/sessionService";

export const createSession = async (req: Request, res: Response) => {
  try {
    const session = await sessionService.createSession(req.body);
    res.status(201).json({ message: "Session created", session });
  } catch (error) {
    res.status(500).json({ message: error });
    res.status(500).json({ message: "Could not create session" });
  }
};

export const joinSession = async (req: Request, res: Response) => {
  try {
    const { sessionId, userId } = req.body;
    const session = await sessionService.joinSession(
      sessionId,
      userId,
    );
    res.status(200).json({ message: "Joined session successfully", session });
  } catch (error) {
    res.status(500).json({ message: "Could not join session" });
  }
};

export const arequestToJoin = async (req: Request, res: Response) => {
  const { sessionId, userId } = req.body;
  await sessionService.requestToJoinSession(sessionId, userId);
  res.json({ message: "Request sent" });
};

export const approveUser = async (req: Request, res: Response) => {
  const { sessionId, userId } = req.body;
  await sessionService.approveUser(sessionId, userId);
  res.json({ message: "User approved" });
};

export const toggleSessionStatus = async (req: Request, res: Response) => {
  try {
    const session = await sessionService.toggleSessionStatus(
      req.params.sessionId
    );
    res.status(200).json({ message: "Session status updated", session });
  } catch (error) {
    res.status(500).json({ message: "Could not update session status" });
  }
};

export const leaveSession = async(req: Request, res: Response)=>{
    const { sessionId, userId } = req.body;
    await sessionService.leaveSession(sessionId, userId);
    res.json({ message: 'Left session' });
}

export const getAllSessions = async (_req: Request, res: Response) => {
  try {
    const sessions = await sessionService.getAllSessions();
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch sessions" });
  }
};

export const getAllActiveSessions = async (_req: Request, res: Response) => {
  try {
    const sessions = await sessionService.getAllActiveSessions();
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch active sessions" });
  }
};

export const getSessionInfo = async (req: Request, res: Response) => {
  try {
    const session = await sessionService.getSessionById(req.params.sessionId);
    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch session details" });
  }
};

export const searchSessions = async (req: Request, res: Response) => {
  try {
    const { query } = req;
    const results = await sessionService.searchSessions(query);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Could not search sessions" });
  }
};

export const kickOutUser = async (req: Request, res: Response) => {
  try {
    const { sessionId, userId } = req.body;
    await sessionService.kickOutUser(sessionId, userId);
    res.status(200).json({ message: "User removed from session" });
  } catch (error) {
    res.status(500).json({ message: "Could not remove user" });
  }
};

export const blockUser = async (req: Request, res: Response) => {
  try {
    const { sessionId, userId } = req.body;
    await sessionService.blockUser(sessionId, userId);
    res.status(200).json({ message: "User blocked" });
  } catch (error) {
    res.status(500).json({ message: "Could not block user" });
  }
};



export const endSession = async (req: Request, res: Response) => {
  try {
    await sessionService.endSession(req.params.sessionId);
    res.status(200).json({ message: "Session ended" });
  } catch (error) {
    res.status(500).json({ message: "Could not end session" });
  }
};

export const getSessionAnalytics = async (req: Request, res: Response) => {
    try {
        const { sessionId } = req.params;
        const analytics = await sessionService.getSessionAnalytics(sessionId);
        res.json(analytics);
    } catch (error) {
      res.status(500).json({ message: "Couldn't get session Analytics" });
    }
  };


  export const toggleMuteUser = async (req: Request, res: Response) => {
    try {
        const { sessionId, userId } = req.body;
        await sessionService.toggleMuteUser(sessionId, userId);
        res.json({ message: 'User mute state toggled' });
    } catch (error) {
      res.status(500).json({ message: "Couldn't Toggle Mute User" });
    }
  };


