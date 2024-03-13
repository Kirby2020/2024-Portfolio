import { Game } from "@prisma/client";
import styles from "./gameCard.module.css";
import Card from "@/app/components/molecules/card/card";
import Link from "next/link";

export default function GameCard(game: Game) {
  return (
    <Link className={styles.gameCard} href={game.url}>
      <Card
        title={game.name}
        previewImageUrl={game.previewUrl}
        previewImageFit="cover"
      ></Card>
    </Link>
  );
}
