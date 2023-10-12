/*
  Warnings:

  - Added the required column `time` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "time" TEXT NOT NULL,
ALTER COLUMN "badge" SET DEFAULT ARRAY[]::TEXT[];
