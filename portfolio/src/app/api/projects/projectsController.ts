"use server";

import prisma from "@/app/lib/prismaClient";
import { Project } from "@prisma/client";

const PAGE_SIZE = 100;

export async function getProjects(): Promise<Project[]> {
  const projects = await prisma.project.findMany({
    take: PAGE_SIZE,
  });

  return projects;
}

export async function getProject(id: string): Promise<Project | null> {
  const project = await prisma.project.findFirst({
    where: { id: id },
  });

  return project;
}
