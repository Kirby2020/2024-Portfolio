import styles from "./imageContainer.module.css";

interface Props {
  src: string;
  alt: string;
}

export default function ImageContainer(props: Props) {
  return (
    <div className={styles.projectImage}>
      <img src={props.src} alt={props.alt} />
    </div>
  );
}
