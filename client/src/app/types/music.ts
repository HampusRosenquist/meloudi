export interface Artist {
    name: string,
    country: string
}

export interface Album {
    title: string,
    artist: string,
    artist_name: string,
    cover: string,
    year: number,
    minutes: number,
    amount: number
}

export interface Song {
    title: string,
    artist: string,
    artist_name: string,
    album: string,
    album_name: string,
    seconds: number,
    index: number
}

export const songs = [
    {
        title: 'Airbag',
        artist: 'Radiohead',
        album: 'OK Computer',
        seconds: 287,
        index: 1
    },
    {
        title: 'Paranoid Android',
        artist: 'Radiohead',
        album: 'OK Computer',
        seconds: 387,
        index: 2
    },
    {
        title: 'Subterranean Homesick Alien',
        artist: 'Radiohead',
        album: 'OK Computer',
        seconds: 287,
        index: 3
    },
    {
        title: 'Fields Of Gold',
        artist: 'Sting',
        album: "Ten Summoner's Tales",
        seconds: 269,
        index: 3
    },
    {
        title: 'Shape Of My Heart',
        artist: 'Sting',
        album: "Ten Summoner's Tales",
        seconds: 279,
        index: 10
    }
];
  
export const albums = [
    {
        title: 'OK Computer',
        artist: 'Radiohead',
        cover: 'OKComputer.png',
        year: 1997,
        minutes: 54,
        amount: 12,
    },
    {
        title: "Ten Summoner's Tales",
        artist: 'Sting',
        cover: 'TenSummersTales.png',
        year: 1993,
        minutes: 52,
        amount: 12,
    }
    
];