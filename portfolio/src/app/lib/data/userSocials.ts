export type SocialIcon = {
    name: string,
    imageUrl: string,
    url: string
}

const userSocials: SocialIcon[] = [
    {
        name: "YouTube",
        imageUrl: "/images/Youtube_logo.png",
        url: "https://www.youtube.com/channel/UCu61nUcXdIW1b-qdL2m-Qkw/"
    },
    {
        name: "Twitch",
        imageUrl: "/images/Twitch_logo.png",
        url: "https://www.twitch.tv/kirby2016"
    }, {
        name: "Spotify",
        imageUrl: "/images/Spotify_logo.png",
        url: "https://open.spotify.com/user/31tz4cekt3ukkbngcx7otrdjsv7u?si=b2cbb66247bf46b8"
    }
];

export { userSocials };