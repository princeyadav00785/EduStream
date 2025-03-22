-- CreateTable
CREATE TABLE "Recording" (
    "id" TEXT NOT NULL,
    "sessionName" TEXT NOT NULL,
    "roomName" TEXT NOT NULL,
    "s3Key" TEXT NOT NULL,
    "duration" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Recording_pkey" PRIMARY KEY ("id")
);
