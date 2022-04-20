import { Component, Input, OnChanges, SimpleChanges} from '@angular/core';

import { albums, songs } from '../datatypes';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnChanges {
  albums = albums;
  songs = songs;
  artists = ['Radiohead', 'Sting', 'Mazzy Star', 'Post Malone'];
  chosenAlbums = albums;
  chosenSongs = songs;
  chosenSong = new Audio("../assets/song.opus");

  @Input() issPlaying = false;

  ngOnChanges(changes: SimpleChanges): void {
      console.log(changes);
  }

chooseArtist(artist: string) {
    this.chosenAlbums = this.albums.filter(album => album.artist === artist);
    this.chosenSongs = this.songs.filter(song => song.artist === artist);
}

chooseAlbum(album: string) {
    this.chosenSongs = this.songs.filter(song => song.album === album);
}

playSong(song: string) {
    this.chosenSong = new Audio("../assets/song.opus");
    this.chosenSong.play();
}

pause() {
    this.chosenSong.pause();
}

stop() {
    this.chosenSong = new Audio("../assets/song.opus");

}
}