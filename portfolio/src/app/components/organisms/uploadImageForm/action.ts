"use server";
import { createImage } from "@/app/api/gallery/imagesController";
import { uploadImage } from "@/app/lib/firebase/images";

export default async function createImageFromForm(data: FormData) {
  const formImage = data.get("image") as File;
  const imageUrl = await uploadImage(formImage);

  if (!imageUrl) {
    return;
  }

  const image = await createImage(formImage.name, imageUrl);
  return image;
}
