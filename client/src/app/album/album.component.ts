import { Component, Output, EventEmitter } from '@angular/core';

import { albums, songs } from '../datatypes';

@Component({
    selector: 'app-album',
    templateUrl: './album.component.html',
    styleUrls: ['./album.component.css']
})
export class AlbumComponent {
    albums = albums;
    songs = songs;
    artists = ['Radiohead', 'Sting', 'Mazzy Star', 'Post Malone'];
    chosenAlbums = albums;
    chosenSongs = songs;
    chosenSong = new Audio("../assets/song.opus");

    @Output() isPlaying = new EventEmitter<boolean>();

    chooseArtist(artist: string) {
        this.chosenAlbums = this.albums.filter(album => album.artist === artist);
        this.chosenSongs = this.songs.filter(song => song.artist === artist);
    }

    chooseAlbum(album: string) {
        this.chosenSongs = this.songs.filter(song => song.album === album);
    }

    playSong(song: string) {
        this.isPlaying.emit(true);
        
    }
}