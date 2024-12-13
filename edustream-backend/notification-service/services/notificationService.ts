import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class NotificationService {
  async createNotification(userId: string, type: string, message: string) {
    return await prisma.notification.create({
      data: {
        userId,
        type,
        message,
      },
    });
  }

  async getUserNotifications(userId: string) {
    return await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }
}

export default new NotificationService();
