/*
  Warnings:

  - You are about to drop the column `SubjectOfExpertise` on the `TeacherProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TeacherProfile" DROP COLUMN "SubjectOfExpertise",
ADD COLUMN     "subjectOfExpertise" TEXT[];
