"use client";

import styles from "./headerUser.module.css";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";

export default function HeaderUser() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const picture = user?.picture ?? "/";
  const username = user?.nickname ?? "";

  return (
    <>
      {!user && <a href="/api/auth/login">Login</a>}
      {user && (
        <div className={styles.container}>
          <Image
            className={styles.userImage}
            src={picture}
            alt={username}
            width={40}
            height={40}
          />
          <a href="/api/auth/logout">Logout</a>
        </div>
      )}
    </>
  );
}
