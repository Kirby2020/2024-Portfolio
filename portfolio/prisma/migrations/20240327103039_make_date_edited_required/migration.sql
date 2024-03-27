/*
  Warnings:

  - Made the column `dateEdited` on table `Image` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dateEdited` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Image" ALTER COLUMN "dateEdited" SET NOT NULL;

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "dateEdited" SET NOT NULL;
