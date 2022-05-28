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
    loadingData:boolean = true;

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

    chooseArtist(artist: string): void {
        this.chosenAlbums = this.albums.filter(album => album.artist_name === artist);
        this.chosenSongs = this.songs.filter(song => song.artist_name === artist);
    }

    chooseAlbum(album: string): void {
        this.chosenSongs = this.songs.filter(song => song.album_title === album);
    }

    playSong(song: Song): void {
        this.chosenSong.emit(song);
    }

    loadArtists(): void {
        this.restService.getArtists().subscribe((data: Rest) => {
            this.artists = data.results;
        })
    }

    loadAlbums(): void {
        this.restService.getAlbums().subscribe((data: Rest) => {
            this.albums = data.results;
            this.chosenAlbums = data.results;
        })
    }

    loadSongs(): void {
        this.restService.getSongs().subscribe((data: Rest) => {
            this.songs = data.results;
            this.chosenSongs = data.results;
            this.songsOutput.emit(this.songs);
            this.loadingData = false;
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

    playChosenAlbum(): void {
        this.playSong(this.chosenSongs[0]);
        this.shareService.clearQueue();
        this.chosenSongs.slice(1).forEach(song => {
            this.shareService.enqueue(song);
        });
    }
}