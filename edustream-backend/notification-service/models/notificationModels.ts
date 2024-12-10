import prisma from '../config/prisma';

export const createNotification = async (data: { userId: string; message: string; type: string }) => {
  return prisma.notification.create({ data });
};

export const getUserNotifications = async (userId: string) => {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
};
