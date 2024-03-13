import styles from "./animeCard.module.css";
import Card from "@/app/components/molecules/card/card";
import Link from "next/link";
import { Anime } from "@/app/lib/graphql/anime/types";

export default function AnimeCard(anime: Anime) {
  return (
    <Link className={styles.animeCard} href={anime.url} target="_blank">
      <Card
        title={anime.title}
        previewImageUrl={anime.coverImage}
        previewImageFit="cover"
      >
        <div className={styles.animeCardHeader}>
          <p>
            {anime.status} ({anime.episodesWatched}/{anime.episodes})
          </p>
        </div>
      </Card>
    </Link>
  );
}
