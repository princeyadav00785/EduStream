-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "sessions";

-- CreateEnum
CREATE TYPE "sessions"."SessionType" AS ENUM ('LIVE', 'RECORDED', 'HYBRID');

-- CreateEnum
CREATE TYPE "sessions"."Visibility" AS ENUM ('PUBLIC', 'PRIVATE');

-- CreateTable
CREATE TABLE "sessions"."Session" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "instructorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "clients" JSONB NOT NULL,
    "recordingLink" TEXT,
    "maxParticipants" INTEGER,
    "sessionType" "sessions"."SessionType" NOT NULL DEFAULT 'LIVE',
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "visibility" "sessions"."Visibility" NOT NULL DEFAULT 'PUBLIC',
    "duration" INTEGER,
    "waitingList" JSONB NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);
