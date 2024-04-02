/*
  Warnings:

  - You are about to drop the column `fileDimensionX` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `fileDimensionY` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `fileExtension` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `fileSize` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Image` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "fileDimensionX",
DROP COLUMN "fileDimensionY",
DROP COLUMN "fileExtension",
DROP COLUMN "fileSize",
DROP COLUMN "title";
