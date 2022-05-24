import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShareService } from '../services/share.service';
import { Song } from '../types/music';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {
  queue: Song[] = [];
  played: Song[] = [];
  private playing!: Song;
  public shuffleOn: boolean = false;
  public replayOn: boolean = false;
  private enqueueSubscription!: Subscription;
  private dequeueSubscription!: Subscription;
  private clearQueueSubscription!: Subscription;

  @Output() nextSong = new EventEmitter<Song>();

  constructor(private shareService: ShareService) { }

  ngOnInit(): void {
    this.enqueueSubscription = this.shareService.getEnqueued().subscribe(song =>
      this.queue.push(song)
    );
    this.dequeueSubscription = this.shareService.getDequeueNotification().subscribe(() =>
      this.queue.pop()
    );
    this.clearQueueSubscription = this.shareService.getClearQueueNotification().subscribe(() =>
      this.clearQueue()
    );
  }

  ngOnDestroy(): void {
    this.enqueueSubscription.unsubscribe();
    this.dequeueSubscription.unsubscribe();
    this.clearQueueSubscription.unsubscribe();
  }

  playNow(song: Song): void {
    if (this.playing) {
      this.played.push(this.playing);
    }
    this.playing = song;
    this.nextSong.emit(song);
  }

  playNext(): void {
    if (this.playing) {
      this.played.push(this.playing);
    }
    if (this.queue.length) {
      if (this.replayOn) {
        if (!this.playing) return;
      } else if (this.shuffleOn) {
        this.playing = this.popRandomFromQueue();
      } else {
        this.playing = <Song> this.queue.shift();
      }
      this.nextSong.emit(this.playing);
    }
  }

  playPrevious(): void {
    if (this.playing) {
      this.queue.unshift(this.playing);
    }
    if (this.played.length) {
      this.playing = <Song> this.played.pop();
      this.nextSong.emit(this.playing);
    }
  }

  drop(event: CdkDragDrop<Song[]>): void {
    moveItemInArray(this.queue, event.previousIndex, event.currentIndex);
  }

  clearQueue(): void {
    this.queue.length = 0;
  }

  dequeu(song: Song): void {
    let index:number = this.queue.indexOf(song);
    if (index != -1) {
      this.queue.splice(index, 1);
    }
  }

  private popRandomFromQueue(): Song {
    let randomIndex:number = Math.floor(Math.random() * (this.queue.length - 1))
    let song:Song = this.queue[randomIndex];
    this.queue.splice(randomIndex, 1);
    return song;
  }

}
