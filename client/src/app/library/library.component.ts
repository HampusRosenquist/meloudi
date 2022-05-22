import { Component, Output, EventEmitter, OnInit } from '@angular/core';

import { Artist, Album, Song } from '../types/music';
import { RestService } from '../services/rest.service';
import { Rest } from '../types/rest';
import { ShareService } from '../services/share.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-library',
    templateUrl: './library.component.html',
    styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
    artists: Artist[] = [];
    albums: Album[] = [];
    songs: Song[] = [];
    chosenAlbums: Album[] = [];
    chosenSongs: Song[] = [];

    @Output() chosenSong = new EventEmitter<Song>();
    @Output() songsOutput = new EventEmitter<Song[]>();

    constructor(
        private restService: RestService,
        private shareService: ShareService,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.loadArtists();
        this.loadAlbums();
        this.loadSongs();
    }

    chooseArtist(artist: string) {
        this.chosenAlbums = this.albums.filter(album => album.artist_name === artist);
        this.chosenSongs = this.songs.filter(song => song.artist_name === artist);
    }

    chooseAlbum(album: string) {
        this.chosenSongs = this.songs.filter(song => song.album_title === album);
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
            this.songsOutput.emit(this.songs);
        })
    }

    enqueueSong(song: Song): boolean {
        this.shareService.enqueue(song);
        
        let _snackBar = this.snackBar.open("Enqueued " + song.title, 'Undo', {
            duration: 3000
        });

        _snackBar.afterDismissed().subscribe(info => {
            if (info.dismissedByAction === true) { // User pressed 'Undo'.
                this.shareService.dequeue();
            }
        });
        return false;
    }

    enqueueAlbum(album: Album): boolean {
        const songs = this.songs.filter(song => song.album_title === album.title);
        songs.forEach(song => {
            this.shareService.enqueue(song);
        });

        let _snackBar = this.snackBar.open("Enqueued " + album.title, 'Undo', {
            duration: 3000
        });

        _snackBar.afterDismissed().subscribe(info => {
            if (info.dismissedByAction === true) { // User pressed 'Undo'.
                for (let i = 0; i < songs.length; i++) {
                    this.shareService.dequeue();
                }
            }
        });
        return false;
    }
}