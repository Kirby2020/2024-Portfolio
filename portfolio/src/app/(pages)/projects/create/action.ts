"use server";

import { createProject } from "@/app/api/projects/projectsController";
import { uploadImageToFirebase } from "@/app/lib/firebase/images";
import { projectValidator } from "@/app/lib/zod/validateProject";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function createProjectFromForm(data: FormData) {
  const newProject = {
    title: data.get("title"),
    type: data.get("type"),
    description: data.get("description"),
    url: data.get("url"),
    dateCreated:
      data.get("dateCreated") !== "" ? data.get("dateCreated") : undefined,
  };

  const formImage = data.get("image") as File;
  const validatedProject = projectValidator.safeParse(newProject);

  if (!validatedProject.success) {
    const errors = validatedProject.error.issues.map(
      (issue) => `${issue.path.join(",")}: ${issue.message}`
    );
    return {
      error: errors,
    };
  }

  const imageUrl = await uploadImageToFirebase(formImage);

  if (!imageUrl) {
    return {
      error: ["Error uploading image to server"],
    };
  }

  const project = await createProject({
    title: validatedProject.data.title,
    description: validatedProject.data.description,
    previewUrl: imageUrl,
    url: validatedProject.data.url,
    type: validatedProject.data.type,
    dateCreated: validatedProject.data.dateCreated,
  });

  if (project) {
    revalidatePath("/projects");
    return redirect("/projects");
  }
}
