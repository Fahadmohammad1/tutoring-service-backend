/*
  Warnings:

  - Added the required column `fullName` to the `GuardianProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `StudentProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `TeacherProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GuardianProfile" ADD COLUMN     "fullName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "StudentProfile" ADD COLUMN     "fullName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TeacherProfile" ADD COLUMN     "fullName" TEXT NOT NULL;
