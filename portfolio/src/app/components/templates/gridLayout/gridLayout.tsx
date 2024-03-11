import styles from "./gridLayout.module.css";

interface Props {
  children: React.ReactNode;
}

export default function GridLayout(props: Props) {
  return <div className={styles.grid}>{props.children}</div>;
}
