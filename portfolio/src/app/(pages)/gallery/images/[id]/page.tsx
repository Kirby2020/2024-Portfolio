import styles from "./page.module.css";
import {
  ImageWithTags,
  getImageWithTags,
} from "@/app/api/gallery/collectionsController";
import ImageContainer from "@/app/components/atoms/imageContainer/imageContainer";
import PageHeader from "@/app/components/molecules/pageHeader/pageHeader";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Image({ params }: { params: { id: string } }) {
  const image: ImageWithTags = await getImageWithTags(params.id);
  console.log(image);
  if (!image) {
    redirect("./");
  }

  return (
    <div>
      <PageHeader title={image.title}></PageHeader>

      <div className={styles.container}>
        <div className={styles.imageInfo}>
          <div className={styles.tagList}>
            <h3>Tags</h3>
            <ul>
              {image.tags.map((tag) => {
                return <li key={tag.id}>{tag.title}</li>;
              })}
            </ul>
          </div>

          <div>
            <h3>Information</h3>
            <p>ID: {image.id}</p>
            <p>Type: {image.fileExtension}</p>
            <p>Size: {image.fileSize.toFixed(2)}</p>
            <p>
              Dimensions: {image.fileDimensionX.toFixed(2)} x{" "}
              {image.fileDimensionY.toFixed(2)}
            </p>
            <span className={styles.divider}></span>
            {image.dateUploaded && (
              <p>Uploaded on: {image.dateUploaded?.toLocaleString()}</p>
            )}
            {image.dateCreated && (
              <p>Created on: {image.dateCreated?.toLocaleString()}</p>
            )}
            {image.dateEdited && (
              <p>Edited on: {image.dateEdited?.toLocaleString()}</p>
            )}
          </div>

          <div className={styles.actions}>
            <h3>Actions</h3>
            <Link href={image.filePath} download={true} target="_blank">
              Download Source
            </Link>
            <Link href={""}>Edit</Link>
            <Link className={styles.delete} href={""}>
              Delete
            </Link>
          </div>
        </div>
        <ImageContainer src={image.filePath} alt={image.fileName} />
      </div>
    </div>
  );
}
