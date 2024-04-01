"use client";

import Form from "@/app/components/organisms/form/page";
import { createEmptyCollection } from "@/app/api/gallery/collectionsController";
import { redirect } from "next/navigation";

export default function CollectionCreateForm() {
  async function action(data: FormData) {
    const title = data.get("title") as string;

    const collection = await createEmptyCollection(title);

    if (collection) {
      return redirect(`/gallery/collections/${collection.id}`);
    }
  }

  return (
    <Form onSubmit={action} errors={[]}>
      <input type="text" name="title" required minLength={5} maxLength={255} />
      <input type="submit" value="Submit" />
    </Form>
  );
}
