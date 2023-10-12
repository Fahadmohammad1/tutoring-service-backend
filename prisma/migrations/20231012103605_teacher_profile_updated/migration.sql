/*
  Warnings:

  - Made the column `designation` on table `TeacherProfile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "TeacherProfile" ADD COLUMN     "SubjectOfExpertise" TEXT[],
ADD COLUMN     "experienceYear" TEXT NOT NULL DEFAULT '0',
ALTER COLUMN "designation" SET NOT NULL;
