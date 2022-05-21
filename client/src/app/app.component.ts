import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSliderChange } from '@angular/material/slider';
import { QueueComponent } from './queue/queue.component';
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
  songs: Song[] = [];
  songsPath = "./assets/"
  audioFile = new Audio(this.songsPath + "song.opus");
  showLibrary = true;
  showPlaylists = false;
  volume = 1;

  viewLibrary() {
    this.showLibrary = true;
    this.showPlaylists = false;
  }
  viewPlaylists() {
    this.showLibrary = false;
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

  receiveSongs(songs: Song[]) {
    this.songs = songs;
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