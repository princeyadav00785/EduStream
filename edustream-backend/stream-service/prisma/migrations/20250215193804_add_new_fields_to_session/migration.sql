-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "category" TEXT,
ADD COLUMN     "instructorName" TEXT,
ADD COLUMN     "rating" DOUBLE PRECISION,
ADD COLUMN     "reviewCount" INTEGER DEFAULT 0,
ADD COLUMN     "thumbnail" TEXT;
