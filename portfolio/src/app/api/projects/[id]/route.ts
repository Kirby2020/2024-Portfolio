import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prismaClient";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const projects = await prisma.project.findFirst({
    where: { id: params.id },
  });

  return NextResponse.json(projects);
}
