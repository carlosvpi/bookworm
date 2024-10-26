/*
  Warnings:

  - You are about to drop the column `usserRole` on the `UserClub` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserClub" DROP COLUMN "usserRole",
ADD COLUMN     "userRole" "UserRole" NOT NULL DEFAULT 'Member';
