import { AnimeList, Anime } from "./types";

export async function getUserAnimeLists(username: string) {
  const apiUrl = "https://graphql.anilist.co";

  const query = `
  {
    MediaListCollection(userName: "${username}", type: ANIME, sort: [STARTED_ON]) {
      lists {
        name
        entries {
          media {
            title {
              romaji
            }
            episodes
            coverImage {
              extraLarge
            }
            bannerImage
            siteUrl
          }
          progress
        }
      }
    }
  }
  `;

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query: query }),
  };

  try {
    const response = await fetch(apiUrl, requestOptions);
    if (!response.ok) {
      throw new Error("Error when fetching anime list: " + response.statusText);
    }
    const data = await response.json();
    const animeLists = createAnimeLists(data.data.MediaListCollection);
    return animeLists;
  } catch (error) {
    console.error("AniList API Error:", error);
    return [];
  }
}

function createAnimeLists(response: any): AnimeList[] {
  return response.lists.map((list: any) => {
    const animes: Anime[] = list.entries.map((entry: any) => ({
      title: entry.media.title.romaji,
      episodes: entry.media.episodes ?? 0,
      episodesWatched: entry.progress,
      coverImage: entry.media.coverImage.extraLarge,
      url: entry.media.siteUrl,
      status: list.name,
    }));

    return {
      title: list.name,
      animes: animes,
    };
  });
}
