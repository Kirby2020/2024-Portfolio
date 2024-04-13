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

export async function getCollectionWithImages(id: number) {
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

export async function createEmptyCollection(data: FormData) {
  const title = data.get("title") as string;

  const collection = await prisma.collection.create({
    data: {
      title: title,
    },
  });

  return collection;
}

export async function updateCollectionPreview(collectionId: number) {
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
