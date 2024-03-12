import { Collection } from "@prisma/client";
import styles from "./collectionCard.module.css";
import Card from "@/app/components/molecules/card/card";
import Link from "next/link";

export default function CollectionCard(collection: Collection) {
  return (
    <Link
      className={styles.collectionCard}
      href={`/gallery/collections/${collection.id}`}
    >
      <Card
        title={collection.title}
        previewImageUrl={collection.previewUrl}
      ></Card>
    </Link>
  );
}
