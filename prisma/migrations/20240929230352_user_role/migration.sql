/*
  Warnings:

  - You are about to drop the column `userId` on the `UserRole` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userRole]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[roleId,restaurantId]` on the table `UserRole` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_userId_fkey";

-- DropIndex
DROP INDEX "UserRole_userId_roleId_restaurantId_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userRole" INTEGER;

-- AlterTable
ALTER TABLE "UserRole" DROP COLUMN "userId";

-- CreateIndex
CREATE UNIQUE INDEX "User_userRole_key" ON "User"("userRole");

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_roleId_restaurantId_key" ON "UserRole"("roleId", "restaurantId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userRole_fkey" FOREIGN KEY ("userRole") REFERENCES "UserRole"("id") ON DELETE SET NULL ON UPDATE CASCADE;
