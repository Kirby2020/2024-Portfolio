import Link from "next/link";
import styles from "./header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <nav>
        <ul>
          <Link href="/">Home</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/anime">Anime</Link>
          <Link href="/games">Games</Link>
          <Link href="/about-me">About Me</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/api/auth/login">Login</Link>
        </ul>
      </nav>
    </header>
  );
}
