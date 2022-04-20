import { Component } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { songs } from './types/music'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Meloudi';
  isPlaying = false;
  audioFile = new Audio("../assets/song.opus");
  song = songs[0];
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
        this.audioFile.play();
    } else {
      this.audioFile.pause();
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
    this.audioFile = new Audio("../assets/song.opus");
  }

  adjustVolume(event: MatSliderChange) {
    if (event.value != null) {
      this.audioFile.volume = event.value / 100;
    }
  }

  adjustPlaybackPosition(event: MatSliderChange) {
    if (event.value != null) {
      this.audioFile.currentTime = event.value;
    }
  }
}
