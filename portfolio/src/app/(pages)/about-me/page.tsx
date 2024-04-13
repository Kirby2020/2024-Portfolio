import styles from "./page.module.css";
import PageHeader from "@/app/components/molecules/pageHeader/pageHeader";
import UserCard from "@/app/components/molecules/userCard/userCard";

export default function AboutMe() {
  return (
    <>
      <PageHeader title="About Me">
        Want to learn more about me? Then you&apos;re at the right place!
      </PageHeader>

      <div className={styles.container}>
        <div className={styles.aboutMe}>
          <p>
            My name is Jonathan and I am a 21-year-old software developer with a
            big passion for programming, particularly in the areas of gaming,
            VR, and AI.
          </p>
          <br />
          <p>
            My love for coding began when I started playing video games at a
            young age and became fascinated by the technology behind them.
          </p>
          <br />
          <p>
            In my free time, I enjoy spending playing games together with my
            friends and pursuing my other hobbies. I played badminton for over
            four years and then started to learn the violin.
          </p>
          <br />
          <p>
            I am also teaching myself how to draw manga both digitally and on
            paper, which has been a great way to unwind after a long day of
            coding.
          </p>
          <br />
          <p>
            My ultimate goal is to become a game developer and create immersive
            gaming experiences for others to enjoy. I am always looking for new
            challenges and opportunities to learn from experienced people.
          </p>
        </div>
        <UserCard />
      </div>
    </>
  );
}
