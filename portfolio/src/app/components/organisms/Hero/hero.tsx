import IntroductionSection from "@/app/components/molecules/introductionSection/introductionSection";
import UserCard from "@/app/components/molecules/userCard/userCard";
import styles from "./hero.module.css";

export default function Hero() {
    return (
        <div className={styles.hero}>
            <IntroductionSection></IntroductionSection>
            <UserCard></UserCard>
        </div >
    );
}