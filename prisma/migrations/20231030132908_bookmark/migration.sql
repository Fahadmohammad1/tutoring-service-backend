/*
  Warnings:

  - You are about to drop the `SaveForLater` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "SaveForLater";

-- CreateTable
CREATE TABLE "Bookmark" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "Bookmark_pkey" PRIMARY KEY ("id")
);
