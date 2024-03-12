import { getProjects } from "@/app/api/projects/projectsController";
import PageHeader from "@/app/components/molecules/pageHeader/pageHeader";
import ProjectCard from "@/app/components/molecules/projectCard/projectCard";
import GridLayout from "@/app/components/templates/gridLayout/gridLayout";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

async function Projects() {
  const projects = await getProjects();

  return (
    <>
      <PageHeader title="Projects">
        Along my journey, I’ve made a lot of different projects.
        <br />
        Here I will post all the large coding projects I have made.
      </PageHeader>
      <GridLayout>
        {projects.map((project) => {
          return <ProjectCard key={project.id} {...project} />;
        })}
      </GridLayout>
    </>
  );
}

export default withPageAuthRequired(Projects, { returnTo: "/projects" });
