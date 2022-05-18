import { Song } from "./music";

export interface Playlist {
    id: number,
    owner: string,
    owner_name: string,
    title: string,
    description: string,
    songs: any[],
    songs_data: Song[],
    is_public: boolean,
    minutes: number,
    amount: number,
    date: Date
};