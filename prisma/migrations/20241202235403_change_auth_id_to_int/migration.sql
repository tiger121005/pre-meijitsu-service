/*
  Warnings:

  - Changed the type of `groupId` on the `Apply` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `authorId` to the `Program` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Apply" DROP COLUMN "groupId",
ADD COLUMN     "groupId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Program" DROP COLUMN "authorId",
ADD COLUMN     "authorId" INTEGER NOT NULL;
