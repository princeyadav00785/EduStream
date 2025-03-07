-- CreateEnum
CREATE TYPE "CourseType" AS ENUM ('FREE', 'PAID');

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "instructorId" INTEGER NOT NULL,
    "enrolledUsers" JSONB NOT NULL,
    "purchaseDates" JSONB NOT NULL,
    "ratings" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION,
    "type" "CourseType" NOT NULL DEFAULT 'FREE',

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);
