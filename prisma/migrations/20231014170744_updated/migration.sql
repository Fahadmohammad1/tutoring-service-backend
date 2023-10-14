/*
  Warnings:

  - Added the required column `timeSlotId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "timeSlotId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_timeSlotId_fkey" FOREIGN KEY ("timeSlotId") REFERENCES "TimeSlots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
