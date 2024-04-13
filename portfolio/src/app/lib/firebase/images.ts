"use server";
import { imageStorage } from "./firebase";

import {
  ref,
  uploadBytes,
  getDownloadURL,
  StorageError,
  deleteObject,
} from "firebase/storage";

/**
 * Uploads an image to Firebase Storage
 * @param image
 * @returns previewUrl or null
 */
export async function uploadImageToFirebase(
  image: File
): Promise<string | null> {
  const imageName = image.lastModified + "_" + image.name;
  const imageRef = ref(imageStorage, "images/" + imageName);

  return await uploadBytes(imageRef, image)
    .then(async (snapshot) => {
      return await getDownloadURL(snapshot.ref);
    })
    .catch((error: StorageError) => {
      console.log(error.message);
      return null;
    });
}

/**
 * Deletes an image from Firebase Storage
 * @param imageUrl
 * @returns void
 */
export async function deleteImageFromFirebase(imageUrl: string): Promise<void> {
  const imageRef = ref(imageStorage, imageUrl);

  deleteObject(imageRef)
    .then(() => {
      console.log("Image deleted successfully");
    })
    .catch((error: StorageError) => {
      console.log(error.message);
    });
}
