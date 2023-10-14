/*
  Warnings:

  - You are about to drop the column `online` on the `Service` table. All the data in the column will be lost.
  - Added the required column `serviceType` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "serviceType" AS ENUM ('remote', 'onsite');

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "online",
ADD COLUMN     "serviceType" "serviceType" NOT NULL;
