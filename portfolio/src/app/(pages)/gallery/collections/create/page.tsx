"use client";

import { createEmptyCollection } from "@/app/api/gallery/collectionsController";
import { redirect } from "next/navigation";

export default function CollectionCreateForm() {
  async function clientAction(data: FormData) {
    const collection = await createEmptyCollection(data);

    if (collection) {
      return redirect(`/gallery/collections/${collection.id}`);
    }
  }

  return (
    <div className="form">
      <form action={clientAction}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" required minLength={5} maxLength={40} />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
