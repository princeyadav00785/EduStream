/*
  Warnings:

  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserCourses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_instructorId_fkey";

-- DropForeignKey
ALTER TABLE "_UserCourses" DROP CONSTRAINT "_UserCourses_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserCourses" DROP CONSTRAINT "_UserCourses_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "courses" JSONB,
ADD COLUMN     "enrolledCourses" JSONB;

-- DropTable
DROP TABLE "Course";

-- DropTable
DROP TABLE "_UserCourses";

-- DropEnum
DROP TYPE "CourseType";
