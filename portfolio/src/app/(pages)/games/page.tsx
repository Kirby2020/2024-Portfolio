import { getGames } from "@/app/api/games/gamesController";
import GameCard from "@/app/components/molecules/GameCard/gameCard";
import PageHeader from "@/app/components/molecules/pageHeader/pageHeader";
import GridLayout from "@/app/components/templates/gridLayout/gridLayout";

export default async function Games() {
  const games = await getGames();

  return (
    <>
      <PageHeader title="Games"></PageHeader>
      <GridLayout>
        {games.map((game) => {
          return <GameCard key={game.id} {...game}></GameCard>;
        })}
      </GridLayout>
    </>
  );
}
