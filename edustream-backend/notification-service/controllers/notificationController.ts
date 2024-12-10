import { Request, Response } from 'express';
import notificationService from '../services/notificationService';

export const sendNotification = async (req: Request, res: Response) => {
  const { userId, type, message } = req.body;
  try {
    const notification = await notificationService.createNotification(userId, type, message);
    res.status(201).json({ notification });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send notification' });
  }
};

export const getNotifications = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const notifications = await notificationService.getUserNotifications(userId);
    res.status(200).json({ notifications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch notifications' });
  }
};
