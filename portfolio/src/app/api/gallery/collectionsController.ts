"use server";

import prisma from "@/app/lib/prismaClient";
import { Collection, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function getCollections(
  limit: number = 10
): Promise<Collection[]> {
  const collections = await prisma.collection.findMany({
    take: limit,
  });

  return collections;
}

export async function getCollectionWithImages(id: string) {
  const collection = await prisma.collection.findFirst({
    where: { id: id },
    include: {
      images: true,
    },
  });

  return collection;
}

export type CollectionWithImages = Prisma.PromiseReturnType<
  typeof getCollectionWithImages
>;

export async function getImageWithTags(id: string) {
  const image = await prisma.image.findFirst({
    where: { id: id },
    include: {
      tags: true,
    },
  });

  return image;
}

export type ImageWithTags = Prisma.PromiseReturnType<typeof getImageWithTags>;

export async function createEmptyCollection(title: string) {
  const newCollection = await prisma.collection.create({
    data: {
      title: title,
    },
  });

  return newCollection;
}

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
  collectionId: string,
  imageId: string
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

async function updateCollectionPreview(collectionId: string) {
  const images = await prisma.collection.findFirst({
    where: { id: collectionId },
    include: {
      images: {
        orderBy: {
          dateUploaded: "desc",
        },
        take: 1,
      },
    },
  });

  if (!images) {
    return;
  }

  const previewUrl = images.images[0].filePath;

  await prisma.collection.update({
    where: { id: collectionId },
    data: {
      previewUrl: previewUrl,
    },
  });

  revalidatePath(`/gallery/collections/${collectionId}`);
}
