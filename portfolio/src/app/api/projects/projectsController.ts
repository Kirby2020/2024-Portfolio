"use server";

import prisma from "@/app/lib/prismaClient";
import { Project } from "@prisma/client";
import { cache } from "react";

const PAGE_SIZE = 100;

export const getProjects = cache(async (): Promise<Project[]> => {
  let projects: Project[] = [];
  try {
    projects = await prisma.project.findMany({
      take: PAGE_SIZE,
    });
  } catch (e) {
    console.log("Error fetching projects: " + e);
  }

  return projects;
});

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

export async function createProject(data: any): Promise<Project | null> {
  try {
    console.log("DATA");
    console.log(data);
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
