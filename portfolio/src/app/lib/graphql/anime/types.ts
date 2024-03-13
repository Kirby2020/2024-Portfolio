export type Anime = {
  title: string;
  episodes: number;
  episodesWatched: number;
  coverImage: string;
  url: string;
  status: string;
};

export type AnimeList = {
  title: string;
  animes: Anime[];
};
