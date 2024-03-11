import { Project } from "@prisma/client";

const BASE_URL = process.env.API_BASE_URL + "/projects";

export async function getProjects(): Promise<Project[]> {
  const res = await fetch(BASE_URL);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getProject(id: string): Promise<Project> {
  const res = await fetch(BASE_URL + "/" + id);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
