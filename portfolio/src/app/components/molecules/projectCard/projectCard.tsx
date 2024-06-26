import { Project } from "@prisma/client";
import styles from "./projectCard.module.css";
import Card from "@/app/components/molecules/card/card";
import Link from "next/link";

export default function ProjectCard(project: Project) {
  return (
    <div className={styles.projectCard}>
      <Card
        title={project.title}
        description={project.description}
        previewImageUrl={project.previewUrl}
      >
        <Link className={styles.button} href={`/projects/${project.id}`}>
          Details
        </Link>
      </Card>
    </div>
  );
}
