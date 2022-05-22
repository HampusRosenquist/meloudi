export interface Artist {
    id: number,
    name: string,
    country: string
}

export interface Album {
    id: number,
    title: string,
    artist: string,
    artist_name: string,
    cover: string,
    year: number,
    minutes: number,
    amount: number
}

export interface Song {
    id: number,
    title: string,
    artist: string,
    artist_name: string,
    album: string,
    album_title: string,
    seconds: number,
    index: number,
    file: string
}