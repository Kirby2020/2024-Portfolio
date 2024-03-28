import { firebaseApp } from "./firebase";

import {
  ref,
  uploadBytes,
  getDownloadURL,
  getStorage,
  StorageError,
} from "firebase/storage";

export async function uploadImage(image: File): Promise<string | null> {
  const firebaseStorage = getStorage(firebaseApp);

  const imageName = image.lastModified + "_" + image.name;
  const firebaseImagesRef = ref(firebaseStorage, "images/" + imageName);

  return await uploadBytes(firebaseImagesRef, image)
    .then(async (snapshot) => {
      const previewUrl = await getDownloadURL(snapshot.ref);
      return previewUrl;
    })
    .catch((error: StorageError) => {
      console.log(error.message);
      return null;
    });
}
