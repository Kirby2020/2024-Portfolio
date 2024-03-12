import Link from "next/link";
import styles from "./header.module.css";
import { getSession } from "@auth0/nextjs-auth0";
import Image from "next/image";
import HeaderUser from "../../atoms/headerUser/headerUser";

export default async function Header() {
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
        </ul>
      </nav>
      <div className={styles.user}>
        <HeaderUser></HeaderUser>
      </div>
    </header>
  );
}
