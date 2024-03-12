import ImageContainer from "@/app/components/atoms/imageContainer/imageContainer";
import styles from "./page.module.css";
import { getProject } from "@/app/api/projects/projectsController";
import PageHeader from "@/app/components/molecules/pageHeader/pageHeader";
import Link from "next/link";
import { redirect } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default async function Project({ params }: Props) {
  const project = await getProject(params.id);

  if (!project) {
    redirect("./");
  }

  const callToActionText = project.type
    ? "View on " + project.type
    : "View here";

  return (
    <div className={styles.project}>
      <PageHeader title={project.title}>
        <Link href={project.url}>{callToActionText}</Link>
      </PageHeader>

      <div className={styles.projectInfo}>
        <div className={styles.projectDescription}>
          <h3>Description</h3>
          <p>{project.description}</p>
        </div>
        <ImageContainer src={project.previewUrl} alt={project.id} />
      </div>
    </div>
  );
}
