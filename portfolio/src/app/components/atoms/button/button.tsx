import styles from "./button.module.css";

type ButtonProps = {
    children?: React.ReactNode;
    handleClick?: () => void;
}

export default function Button(props: ButtonProps) {
    return (
        <button className={styles.button} onClick={props.handleClick}>
            {props.children}
        </button>
    );
}