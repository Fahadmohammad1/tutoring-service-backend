/*
  Warnings:

  - You are about to drop the column `author` on the `Service` table. All the data in the column will be lost.
  - Added the required column `authorEmail` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorName` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Service" DROP COLUMN "author",
ADD COLUMN     "authorEmail" TEXT NOT NULL,
ADD COLUMN     "authorName" TEXT NOT NULL;
