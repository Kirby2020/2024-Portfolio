let accessToken: string;

async function fetchAccessToken() {
  try {
    const response = await fetch("https://id.twitch.tv/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.TWITCH_CLIENT_ID,
        client_secret: process.env.TWITCH_CLIENT_SECRET,
        grant_type: "client_credentials",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch access token");
    }

    const data = await response.json();
    accessToken = data.access_token;
  } catch (error) {
    console.error("Error fetching access token:", error);
  }
}

export async function getGame() {
  try {
    if (!accessToken) {
      await fetchAccessToken();
    }

    const response = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        "Client-ID": process.env.TWITCH_CLIENT_ID ?? "",
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "text/plain",
      },
      body: "fields *;",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch games");
    }

    const data = await response.json();
  } catch (error) {
    console.error("Error fetching games:", error);
  }
}
