import { Component } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Meloudi';
  isPlaying = false;
  chosenSong = new Audio("../assets/song.opus");
  showAlbums = true;
  showPlaylists = false;

  viewAlbums() {
    this.showAlbums = true;
    this.showPlaylists = false;
  }
  viewPlaylists() {
    this.showAlbums = false;
    this.showPlaylists = true;
  }

  applyPlayingState() {
    if (this.isPlaying) {
        this.chosenSong.play();
    } else {
      this.chosenSong.pause();
    }
  }

  setIsPlaying(isPlaying: boolean) {
    this.isPlaying = isPlaying;
    this.applyPlayingState();
  }

  toggleIsPlaying() {
    this.isPlaying = !this.isPlaying;
    this.applyPlayingState();
  }

  stop() {
    this.setIsPlaying(false);
    this.chosenSong = new Audio("../assets/song.opus");
  }

  adjustVolume(event: MatSliderChange) {
    if (event.value != null) {
      this.chosenSong.volume = event.value / 100;
    }
  }
}
