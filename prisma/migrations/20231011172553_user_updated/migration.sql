/*
  Warnings:

  - You are about to drop the column `presentAdress` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `presentAddress` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "presentAdress",
ADD COLUMN     "presentAddress" TEXT NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'user';

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
