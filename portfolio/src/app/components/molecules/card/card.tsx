import styles from "./card.module.css";

interface Props {
  title: String;
  description?: String;
  url: String;
  previewImageUrl: String;
  children?: React.ReactNode;
}

export default function Card(props: Props) {
  return (
    <div className={styles.card}>
      {props.children && (
        <div className={styles.cardHeader}>{props.children}</div>
      )}
      <div className={styles.cardFooter}>
        <h3>{props.title}</h3>
        <p>{props.description}</p>
      </div>
    </div>
  );
}
