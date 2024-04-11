import prisma from "@/app/lib/prismaClient";
import { updateCollectionPreview } from "./collectionsController";

export async function createImage(fileName: string, filePath: string) {
  const newImage = await prisma.image.create({
    data: {
      fileName: fileName,
      filePath: filePath,
    },
  });

  return newImage;
}

export async function addImageToCollection(
  collectionId: number,
  imageId: number
) {
  const collection = await prisma.collection.update({
    where: { id: collectionId },
    data: {
      images: {
        connect: {
          id: imageId,
        },
      },
    },
  });

  await updateCollectionPreview(collectionId);

  return collection;
}
