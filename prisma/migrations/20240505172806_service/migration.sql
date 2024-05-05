/*
  Warnings:

  - You are about to drop the column `timeSlotId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the `TimeSlots` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_timeSlotId_fkey";

-- DropForeignKey
ALTER TABLE "TimeSlots" DROP CONSTRAINT "TimeSlots_serviceId_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "timeSlotId";

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "schedule" TEXT;

-- DropTable
DROP TABLE "TimeSlots";
