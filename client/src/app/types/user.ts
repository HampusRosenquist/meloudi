import { Song } from "./music";

export interface Playlist {
    owner: string,
    owner_name: string,
    title: string,
    description: string,
    songs: Song[],
    is_public: boolean,
    minutes: number,
    amount: number,
    date: Date
};