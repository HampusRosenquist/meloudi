import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { QueueComponent } from './queue/queue.component';
import { Song } from './types/music';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title:string = 'Meloudi';
  isPlaying:boolean = false;
  isShuffling:boolean = false;
  isReplaying:boolean = false;
  isWriting:boolean = false;
  song = <Song>{};
  songs: Song[] = [];
  songsPath = "./assets/";
  audioFile = document.createElement('audio'); //new Audio(this.songsPath + "song.opus");
  volume = 1;

  @ViewChild(QueueComponent) private queueComponent!: QueueComponent;

  ngOnInit(): void {
    this.audioFile.setAttribute('src', this.songsPath + "song.opus");
  }

  ngAfterViewInit(): void {
    this.audioFile.addEventListener('ended', () => {
      this.isPlaying = false;
      this.audioFile.currentTime = 0;
      this.next();
    });

    document.addEventListener('keyup', (event) => {
      if (!this.isWriting && event.code === "Space") {
        this.toggleIsPlaying();
      }
    }, false);
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

  playNow(song: Song) {
    this.queueComponent.playNow(song);
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

  previous() {
    if (this.audioFile.currentTime > 5) {
      this.audioFile.currentTime = 0;
      this.audioFile.play();
    } else {
      this.queueComponent.playPrevious();
    }
  }

  next() {
    this.queueComponent.playNext();
  }

  stop() {
    this.setIsPlaying(false);
    this.audioFile.currentTime = 0;
  }

  toggleShuffling(): void {
    this.queueComponent.shuffleOn = !this.queueComponent.shuffleOn;
    this.isShuffling = this.queueComponent.shuffleOn;
  }

  toggleReplaying(): void {
    this.queueComponent.replayOn = !this.queueComponent.replayOn;
    this.isReplaying = this.queueComponent.replayOn;
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

  setIsWirting(isWriting: boolean): void {
    this.isWriting = isWriting;
  }
}