import styles from "./pageHeader.module.css";
import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  title: string;
  alignment?: "left" | "center" | "right";
}

export default function PageHeader(props: Props) {
  const alignment = props.alignment ? props.alignment : "left";

  return (
    <div className={styles.pageHeader}>
      <div
        className={clsx({
          [styles.left]: alignment === "left",
          [styles.center]: alignment === "center",
          [styles.right]: alignment === "right",
        })}
      >
        <h1>{props.title}</h1>
        <p>{props.children}</p>
        <span className={styles.separator} />
      </div>
    </div>
  );
}
