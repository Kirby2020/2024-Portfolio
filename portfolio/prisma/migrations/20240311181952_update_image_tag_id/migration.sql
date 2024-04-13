/*
  Warnings:

  - The primary key for the `ImageTag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `ImageTag` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `B` on the `_ImageToImageTag` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "_ImageToImageTag" DROP CONSTRAINT "_ImageToImageTag_B_fkey";

-- AlterTable
ALTER TABLE "ImageTag" DROP CONSTRAINT "ImageTag_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ImageTag_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "_ImageToImageTag" DROP COLUMN "B",
ADD COLUMN     "B" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ImageTag_id_key" ON "ImageTag"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_ImageToImageTag_AB_unique" ON "_ImageToImageTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ImageToImageTag_B_index" ON "_ImageToImageTag"("B");

-- AddForeignKey
ALTER TABLE "_ImageToImageTag" ADD CONSTRAINT "_ImageToImageTag_B_fkey" FOREIGN KEY ("B") REFERENCES "ImageTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
