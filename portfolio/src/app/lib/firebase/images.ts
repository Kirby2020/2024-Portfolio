import { firebaseApp } from "./firebase";

import {
  ref,
  uploadBytes,
  getDownloadURL,
  getStorage,
  StorageError,
} from "firebase/storage";

/**
 * Uploads an image to Firebase Storage
 * @param image
 * @returns previewUrl or null
 */
export async function uploadImage(image: File): Promise<string | null> {
  const firebaseStorage = getStorage(firebaseApp);

  const imageName = image.lastModified + "_" + image.name;
  const firebaseImagesRef = ref(firebaseStorage, "images/" + imageName);

  return await uploadBytes(firebaseImagesRef, image)
    .then(async (snapshot) => {
      return await getDownloadURL(snapshot.ref);
    })
    .catch((error: StorageError) => {
      console.log(error.message);
      return null;
    });
}
