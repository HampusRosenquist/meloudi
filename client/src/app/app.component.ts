import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { QueueComponent } from './queue/queue.component';
import { Song } from './types/music';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit {
  isPlaying:boolean = false;
  isShuffling:boolean = false;
  isReplaying:boolean = false;
  isWriting:boolean = false;
  song:Song = <Song>{};
  songs:Song[] = [];
  songsPath:string = "./assets/";
  audioFile:HTMLAudioElement = document.createElement('audio');
  volume:number = 1;

  @ViewChild(QueueComponent) private queueComponent!:QueueComponent;

  ngAfterViewInit(): void {
    this.audioFile.addEventListener('ended', () => {
      this.isPlaying = false;
      this.audioFile.currentTime = 0;
      this.next();
    });

    // Keyboard controls
    document.addEventListener('keyup', (event) => {
      if (!this.isWriting) {
        switch (event.code) {
          case "Space":
            this.toggleIsPlaying();
            break;
          case "KeyS":
            this.stop();
            break;
          case "KeyN":
            this.next();
            break;
          case "KeyP":
            this.previous();
            break;
        }
      }
    }, false);
  }

  applyPlayingState(): void {
    if (this.audioFile.getAttribute('src')) {
      if (this.isPlaying) {
          this.audioFile.play();
          this.audioFile.volume = this.volume;
      } else {
        this.audioFile.pause();
      }
    } else {
      this.isPlaying = false;
    }
  }

  setIsPlaying(isPlaying: boolean): void {
    this.isPlaying = isPlaying;
    this.applyPlayingState();
  }

  playNow(song: Song): void {
    this.queueComponent.playNow(song);
  }

  playSong(song: Song): void {
    this.setIsPlaying(false);
    this.song = song;
    this.audioFile.setAttribute('src', this.songsPath + song.file);
    this.setIsPlaying(true);
  }

  receiveSongs(songs: Song[]): void {
    this.songs = songs;
  }

  toggleIsPlaying(): void {
    this.isPlaying = !this.isPlaying;
    this.applyPlayingState();
  }

  previous(): void {
    if (this.audioFile.currentTime > 5) {
      this.audioFile.currentTime = 0;
      this.audioFile.play();
    } else {
      this.queueComponent.playPrevious();
    }
  }

  next(): void {
    this.queueComponent.playNext();
  }

  stop(): void {
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

  adjustVolume(event: MatSliderChange): void {
    if (event.value != null) {
      this.volume = event.value / 100
      this.audioFile.volume = this.volume;
    }
  }

  adjustPlaybackPosition(event: MatSliderChange): void {
    if (event.value != null) {
      this.audioFile.currentTime = event.value;
    }
  }

  setIsWirting(isWriting: boolean): void {
    this.isWriting = isWriting;
  }
}