import { Component, Output, EventEmitter, OnInit } from '@angular/core';

import { Artist, Album, Song } from '../types/music';
import { RestService } from '../services/rest.service';
import { Rest } from '../types/rest';

@Component({
    selector: 'app-album',
    templateUrl: './album.component.html',
    styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit{
    artists: Artist[] = [];
    albums: Album[] = [];
    songs: Song[] = [];
    chosenAlbums: Album[] = [];
    chosenSongs: Song[] = [];

    @Output() chosenSong = new EventEmitter<Song>();

    ngOnInit(): void {
        this.loadArtists();
        this.loadAlbums();
        this.loadSongs();
    }

    constructor(public restService: RestService) { }

    chooseArtist(artist: string) {
        this.chosenAlbums = this.albums.filter(album => album.artist_name === artist);
        this.chosenSongs = this.songs.filter(song => song.artist_name === artist);
    }

    chooseAlbum(album: string) {
        this.chosenSongs = this.songs.filter(song => song.album_name === album);
    }

    playSong(song: Song) {
        this.chosenSong.emit(song);
    }

    loadArtists() {
        return this.restService.getArtists().subscribe((data: Rest) => {
            this.artists = data.results;
        })
    }

    loadAlbums() {
        return this.restService.getAlbums().subscribe((data: Rest) => {
            this.albums = data.results;
            this.chosenAlbums = data.results;
        })
    }

    loadSongs() {
        return this.restService.getSongs().subscribe((data: Rest) => {
            this.songs = data.results;
            this.chosenSongs = data.results;
        })
    }
}