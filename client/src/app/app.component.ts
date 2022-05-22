import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { Song } from './types/music';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Meloudi';
  isPlaying = false;
  song = <Song>{};
  songs: Song[] = [];
  songsPath = "./assets/";
  audioFile = document.createElement('audio'); //new Audio(this.songsPath + "song.opus");
  volume = 1;

  ngOnInit(): void {
    this.audioFile.setAttribute('src', this.songsPath + "song.opus");
    this.audioFile.addEventListener('ended', () => {
      this.isPlaying = false;
      this.audioFile.currentTime = 0;
    });
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

  playSong(song: Song) {
    this.setIsPlaying(false);
    this.song = song;
    this.audioFile.setAttribute('src', this.songsPath + song.file); //new Audio(this.songsPath + song.file);
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