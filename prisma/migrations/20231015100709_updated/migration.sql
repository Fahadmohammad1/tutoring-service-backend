/*
  Warnings:

  - You are about to drop the column `rating` on the `Service` table. All the data in the column will be lost.
  - Added the required column `rating` to the `Reviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reviews" ADD COLUMN     "rating" TEXT NOT NULL,
ALTER COLUMN "text" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "rating";
