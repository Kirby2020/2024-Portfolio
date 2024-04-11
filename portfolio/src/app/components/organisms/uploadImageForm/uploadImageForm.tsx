"use client";

import createImageFromForm from "./action";
import { addImageToCollection } from "@/app/api/gallery/imagesController";

interface Props {
  collectionId: number;
}

export default function UploadImageForm(props: Props) {
  async function clientAction(data: FormData) {
    const image = await createImageFromForm(data);
    if (!image) {
      return;
    }
    await addImageToCollection(props.collectionId, image.id);
  }
  return (
    <div className="form">
      <form action={clientAction}>
        <input type="file" name="image" accept="image/*" required />
        <input type="submit" value="Upload" />
      </form>
    </div>
  );
}
