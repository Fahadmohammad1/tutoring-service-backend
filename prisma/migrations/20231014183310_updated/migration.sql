-- CreateEnum
CREATE TYPE "bookingStatus" AS ENUM ('pending', 'booked', 'completed');

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "status" "bookingStatus" NOT NULL DEFAULT 'pending';
