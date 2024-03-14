import Button from "@/app/components/atoms/button/button";
import styles from "./page.module.css";
import { uploadImage } from "@/app/lib/firebase/images";
import { createProject } from "@/app/api/projects/projectsController";
import { ProjectType } from "@prisma/client";
import { redirect } from "next/navigation";

//TODO: Cleanup validation
export default function ProjectCreateForm() {
  async function create(data: FormData) {
    "use server";
    const title = data.get("title")!.toString();
    const description = data.get("description")!.toString();
    const type = data.get("type")!.toString();
    const url = data.get("url")!.toString();
    const dateCreated = data.get("dateCreated")
      ? new Date(data.get("dateCreated")!.toString()).toISOString()
      : null;
    const formImage = data.get("image") as File;

    const imageUrl = await uploadImage(formImage);

    console.log("image uploaded: " + imageUrl);

    if (!imageUrl) return;

    const project = await createProject({
      title: title,
      description: description,
      previewUrl: imageUrl,
      url: url,
      type: ProjectType.GitHub,
      dateCreated: dateCreated,
    });

    if (project) {
      redirect("./");
    }
  }

  return (
    <form className={styles.form} action={create}>
      <input type="text" placeholder="Title" name="title" required />
      <input type="text" placeholder="Type" name="type" />
      <textarea
        placeholder="Description"
        name="description"
        rows={5}
        required
      />
      <input type="text" placeholder="URL" name="url" required />
      <input type="date" name="dateCreated" />
      <input type="file" name="image" required />
      <button type="submit">
        <Button>Submit</Button>
      </button>
    </form>
  );
}
