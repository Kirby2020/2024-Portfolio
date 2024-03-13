"use server";

import prisma from "@/app/lib/prismaClient";
import { Project } from "@prisma/client";

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

  return projects;
}

export async function getProject(id: string): Promise<Project | null> {
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
