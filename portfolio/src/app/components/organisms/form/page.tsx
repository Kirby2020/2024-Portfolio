"use client";

import { useState } from "react";
import styles from "./page.module.css";

interface FormProps {
  onSubmit: (data: FormData) => void;
  children: React.ReactNode;
  errors: string[];
}

export default function Form(props: FormProps) {
  return (
    <form className={styles.form} action={props.onSubmit}>
      {props.errors?.length > 0 && (
        <div className={styles.errorMessages}>
          {props.errors?.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </div>
      )}
      {props.children}
    </form>
  );
}
