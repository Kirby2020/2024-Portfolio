"use client";

import Button from "@/app/components/atoms/button/button";
import styles from "./introductionSection.module.css";
import { useRouter } from "next/navigation";

export default function AboutMeSection() {
    const router = useRouter();

    return (
        <div className={styles.introduction}>
            <h2>About Me</h2>
            <p>My name is Jonathan and I am a 21-year-old software developer
                with a big passion for programming, particularly in the areas of
                gaming, VR, and AI.
                <br /><br />
                My love for coding began when I started playing video games at a
                young age and became fascinated by the technology behind them.
            </p>
            <Button handleClick={() => router.push("/about-me")}>Learn more</Button>
        </div>
    )
}