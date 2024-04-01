import Link from "next/link";
import styles from "./socialsList.module.css";
import { SocialIcon } from "@/app/lib/data/userSocials";
import Image from "next/image";

interface Props {
  socialIcons: SocialIcon[];
}

export default function SocialsList(props: Props) {
  return (
    <div className={styles.socialsList}>
      {props.socialIcons.map((social) => {
        if (social.url === "") return;

        return (
          <Link
            key={social.name}
            href={social.url}
            className={styles.socialIcon}
            target="_blank"
          >
            <Image
              src={social.imageUrl}
              alt={social.name}
              width={40}
              height={40}
            />
          </Link>
        );
      })}
    </div>
  );
}
