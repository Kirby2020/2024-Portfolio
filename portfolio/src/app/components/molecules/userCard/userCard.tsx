import Image from "next/image";
import styles from "./userCard.module.css";
import userImage from "@public/user_image.png";
import { userSocials } from "@/app/lib/data/userSocials";
import SocialsList from "../socialsList/socialsList";

export default function UserCard() {
    return (
        <div className={styles.userCard}>
            <div className={styles.userInfo}>
                <div>
                    <p>Jonathan</p>
                    <p>21 years old</p>
                    <p>Male</p>
                </div>
                <div>
                    <p>Hobbies:</p>
                    <ul>
                        <li>Gaming</li>
                        <li>Programming</li>
                        <li>Drawing</li>
                        <li>Violin</li>
                        <li>Badminton</li>
                    </ul>
                </div>
            </div>

            <div className={styles.userInfo}>
                <Image className={styles.userImage} src={userImage} alt="user image" />
                <SocialsList socialIcons={userSocials} />
            </div>
        </div>
    );
}