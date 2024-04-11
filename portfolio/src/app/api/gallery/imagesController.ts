"use server";
import prisma from "@/app/lib/prismaClient";
import { updateCollectionPreview } from "./collectionsController";
import { Prisma } from "@prisma/client";
import {
  deleteImageFromFirebase,
  uploadImageToFirebase,
} from "@/app/lib/firebase/images";

export async function getImageWithTags(id: number) {
  const image = await prisma.image.findFirst({
    where: { id: id },
    include: {
      tags: true,
    },
  });

  return image;
}

export type ImageWithTags = Prisma.PromiseReturnType<typeof getImageWithTags>;

export async function createImage(data: FormData) {
  const image = data.get("image") as File;
  const imageUrl = await uploadImageToFirebase(image);

  if (!imageUrl) {
    return;
  }

  const newImage = await prisma.image.create({
    data: {
      fileName: image.name,
      filePath: imageUrl,
    },
  });

  return newImage;
}

export async function deleteImage(id: number) {
  const image = await prisma.image.delete({
    where: { id: id },
  });

  deleteImageFromFirebase(image.filePath);

  return image;
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
