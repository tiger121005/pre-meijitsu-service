/*
  Warnings:

  - You are about to drop the column `roomType` on the `Apply` table. All the data in the column will be lost.
  - You are about to drop the column `stageType` on the `Apply` table. All the data in the column will be lost.
  - You are about to drop the column `storeType` on the `Apply` table. All the data in the column will be lost.
  - Added the required column `detailType` to the `Apply` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Apply" DROP COLUMN "roomType",
DROP COLUMN "stageType",
DROP COLUMN "storeType",
ADD COLUMN     "detailType" TEXT NOT NULL;
