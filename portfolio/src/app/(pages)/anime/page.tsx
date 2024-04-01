import styles from "./page.module.css";
import AnimeCard from "@/app/components/molecules/animeCard/animeCard";
import PageHeader from "@/app/components/molecules/pageHeader/pageHeader";
import GridLayout from "@/app/components/templates/gridLayout/gridLayout";
import { getUserAnimeLists } from "@/app/lib/graphql/anime/getUserAnimeList";
import Link from "next/link";

export default async function Animes() {
  const fullAnimeList = await getUserAnimeLists("Kirby2019");
  return (
    <>
      <PageHeader title="Anime">
        Like anime? Me too! <br /> Take a look around, you might find something
        you like. <br />
        <br />
        More details here{" "}
        <Link href={"https://anilist.co/user/Kirby2019/"} target="_blank">
          @Kirby2019
        </Link>
      </PageHeader>

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
