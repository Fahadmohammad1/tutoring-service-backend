/*
  Warnings:

  - Added the required column `author` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "badge" TEXT[],
ADD COLUMN     "price" TEXT NOT NULL DEFAULT '0',
ADD COLUMN     "rating" TEXT[] DEFAULT ARRAY['0']::TEXT[],
ADD COLUMN     "thumbnail" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
