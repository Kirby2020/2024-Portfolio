"use server";

import prisma from "@/app/lib/prismaClient";
import { Collection, Prisma } from "@prisma/client";

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
