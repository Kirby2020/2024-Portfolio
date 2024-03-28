"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { projectValidator } from "@/app/lib/zod/validateProject";
import createProjectFromForm from "./action";
import { Project, ProjectType } from "@prisma/client";

export default function ProjectCreateForm() {
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  async function clientAction(data: FormData) {
    // Validate on client first
    const newProject = {
      title: data.get("title"),
      type: data.get("type"),
      description: data.get("description"),
      url: data.get("url"),
      dateCreated:
        data.get("dateCreated") !== "" ? data.get("dateCreated") : undefined,
    };

    const validatedProject = projectValidator.safeParse(newProject);

    if (!validatedProject.success) {
      console.log(validatedProject.error.issues);
      const errors = validatedProject.error.issues.map(
        (issue) => `${issue.path.join(",")}: ${issue.message}`
      );
      setErrorMessages(errors);
      return;
    }

    // Validate on server
    const response = await createProjectFromForm(data);

    if (response?.error) {
      setErrorMessages(response.error);
      return;
    }
  }

  return (
    <form className={styles.form} action={clientAction}>
      {errorMessages.length > 0 && (
        <div className={styles.errorMessages}>
          {errorMessages.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </div>
      )}
      <input type="text" placeholder="Title" name="title" required />
      <select name="type" required>
        {Object.values(ProjectType).map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <textarea
        placeholder="Description"
        name="description"
        rows={5}
        required
      />
      <input type="text" placeholder="URL" name="url" required />
      <input type="date" name="dateCreated" />
      <input type="file" name="image" required />
      <button type="submit">Submit</button>
    </form>
  );
}
