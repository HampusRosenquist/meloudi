import { Component } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { Song } from './types/music';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Meloudi';
  isPlaying = false;
  song = <Song>{};
  songsPath = "./assets/"
  audioFile = new Audio(this.songsPath + "song.opus");
  showAlbums = true;
  showPlaylists = false;
  volume = 100;

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
        this.audioFile.volume = this.volume;
    } else {
      this.audioFile.pause();
    }
  }

  setIsPlaying(isPlaying: boolean) {
    this.isPlaying = isPlaying;
    this.applyPlayingState();
  }

  chooseSong(song: Song) {
    this.setIsPlaying(false);
    this.song = song;
    this.audioFile = new Audio(this.songsPath + song.file);
    this.setIsPlaying(true);
  }

  toggleIsPlaying() {
    this.isPlaying = !this.isPlaying;
    this.applyPlayingState();
  }

  stop() {
    this.setIsPlaying(false);
    this.audioFile.currentTime = 0;
  }

  adjustVolume(event: MatSliderChange) {
    if (event.value != null) {
      this.volume = event.value / 100
      this.audioFile.volume = this.volume;
    }
  }

  adjustPlaybackPosition(event: MatSliderChange) {
    if (event.value != null) {
      this.audioFile.currentTime = event.value;
    }
  }
}
