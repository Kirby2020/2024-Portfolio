import { NextRequest, NextResponse } from "next/server";
import { createProject } from "./projectsController";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const project = await createProject(data);
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
