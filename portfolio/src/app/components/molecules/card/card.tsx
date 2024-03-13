import Image from "next/image";
import styles from "./card.module.css";

interface Props {
  title: string;
  description?: string;
  previewImageUrl: string;
  previewImageFit?: "contain" | "cover";
  children?: React.ReactNode;
}

export default function Card(props: Props) {
  const previewImageFit = props.previewImageFit
    ? props.previewImageFit
    : "contain";

  return (
    <div className={styles.card}>
      {props.children && (
        <div className={styles.cardHeader}>{props.children}</div>
      )}
      <div className={styles.cardFooter}>
        <h3>{props.title}</h3>
        <p>{props.description}</p>
      </div>
      <Image
        src={props.previewImageUrl}
        alt={`${props.title} image`}
        fill
        style={{
          objectFit: previewImageFit,
        }}
      />
    </div>
  );
}
