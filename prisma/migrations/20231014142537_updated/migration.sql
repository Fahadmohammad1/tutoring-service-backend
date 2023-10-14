-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "reviews" JSONB[] DEFAULT ARRAY[]::JSONB[];
