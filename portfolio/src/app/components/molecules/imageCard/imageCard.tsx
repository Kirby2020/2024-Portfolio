import { Image } from "@prisma/client";
import styles from "./imageCard.module.css";
import Card from "@/app/components/molecules/card/card";
import Link from "next/link";

export default function ImageCard(image: Image) {
  return (
    <Link className={styles.imageCard} href={`/gallery/images/${image.id}`}>
      <Card title={image.title} previewImageUrl={image.filePath}></Card>
    </Link>
  );
}
