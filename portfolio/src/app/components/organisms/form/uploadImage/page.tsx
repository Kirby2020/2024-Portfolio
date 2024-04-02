"use client";
import Form from "../page";
import createImageFromForm from "./action";
import { addImageToCollection } from "@/app/api/gallery/collectionsController";

export default function UploadImageForm(props: { collectionId: number }) {
  async function onSubmit(data: FormData) {
    const image = await createImageFromForm(data);

    if (!image) {
      return;
    }

    await addImageToCollection(props.collectionId, image.id);
  }
  return (
    <>
      <Form onSubmit={onSubmit} errors={[]}>
        <input type="file" name="image" accept="image/*" required />
        <input type="submit" value="Upload" />
      </Form>
    </>
  );
}
