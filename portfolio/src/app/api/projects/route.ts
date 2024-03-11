import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prismaClient";

const PAGE_SIZE = 100;

export async function GET(req: NextRequest) {
  const projects = await prisma.project.findMany({
    take: PAGE_SIZE,
  });

  return NextResponse.json(projects);
}
