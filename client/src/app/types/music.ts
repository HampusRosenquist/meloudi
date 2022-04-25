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
    index: number,
    file: string
}