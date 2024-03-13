import styles from "./page.module.css";
import AnimeCard from "@/app/components/molecules/animeCard/animeCard";
import PageHeader from "@/app/components/molecules/pageHeader/pageHeader";
import GridLayout from "@/app/components/templates/gridLayout/gridLayout";
import { getUserAnimeLists } from "@/app/lib/graphql/anime/getUserAnimeList";

export default async function Animes() {
  const fullAnimeList = await getUserAnimeLists("Kirby2019");
  return (
    <>
      <PageHeader title="Anime"></PageHeader>
      {fullAnimeList.map((list) => {
        return (
          <div className={styles.animeList} key={list.title}>
            <h2>{list.title}</h2>
            <GridLayout>
              {list.animes.map((anime) => {
                return <AnimeCard key={anime.title} {...anime}></AnimeCard>;
              })}
            </GridLayout>
          </div>
        );
      })}
    </>
  );
}
