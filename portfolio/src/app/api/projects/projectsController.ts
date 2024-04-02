import prisma from "@/app/lib/prismaClient";
import { Prisma, Project } from "@prisma/client";
import { revalidatePath } from "next/cache";

const PAGE_SIZE = 100;

export async function getProjects(): Promise<Project[]> {
  let projects: Project[] = [];
  try {
    projects = await prisma.project.findMany({
      take: PAGE_SIZE,
    });
  } catch (e) {
    console.log("Error fetching projects: " + e);
  }
  revalidatePath("/projects");
  return projects;
}

export async function getProject(id: number): Promise<Project | null> {
  let project: Project | null = null;
  try {
    project = await prisma.project.findFirst({
      where: { id: id },
    });
  } catch (e) {
    console.log(`Error fetching project ${id}: ` + e);
  }

  return project;
}

export async function createProject(
  data: Prisma.ProjectCreateInput
): Promise<Project | null> {
  try {
    const project = await prisma.project.create({
      data: {
        ...data,
      },
    });
    return project;
  } catch (e) {
    console.error("Error creating project:", e);
    throw e;
  }
}
