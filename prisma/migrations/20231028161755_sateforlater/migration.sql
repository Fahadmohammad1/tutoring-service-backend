-- CreateTable
CREATE TABLE "SaveForLater" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "SaveForLater_pkey" PRIMARY KEY ("id")
);
