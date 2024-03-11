import { Project } from "@prisma/client";

const BASE_URL = process.env.NEXT_PUBLIC_URL + "/api/projects";

// server-side code (e.g., API routes, getServerSideProps, etc.)
export const getServerSideProps = async (context: any) => {
  const req = context.req;
  const domain = req.headers.host; // get the current domain

  const BASE_URL = `http://${domain}/api/projects`; // construct the base URL

  return {
    props: {
      BASE_URL,
    },
  };
};

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
