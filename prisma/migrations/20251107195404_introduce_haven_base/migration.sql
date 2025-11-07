/*
  Warnings:

  - You are about to drop the column `establishmentId` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the `Establishment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `havenId` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_establishmentId_fkey";

-- DropForeignKey
ALTER TABLE "Establishment" DROP CONSTRAINT "Establishment_ownerId_fkey";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "establishmentId",
ADD COLUMN     "havenId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Establishment";

-- CreateTable
CREATE TABLE "Haven" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "Haven_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Haven" ADD CONSTRAINT "Haven_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_havenId_fkey" FOREIGN KEY ("havenId") REFERENCES "Haven"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
