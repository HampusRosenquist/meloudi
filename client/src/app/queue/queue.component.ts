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
  private enqueueSubscription!: Subscription;
  private dequeueSubscription!: Subscription;

  @Output() nextSong = new EventEmitter<Song>();

  constructor(private shareService: ShareService) { }

  ngOnInit(): void {
    this.enqueueSubscription = this.shareService.getEnqueued().subscribe(song =>
      this.queue.push(song)
    );
    this.dequeueSubscription = this.shareService.getDequeueNotification().subscribe(() =>
      this.queue.pop()
    );
  }

  ngOnDestroy(): void {
    this.enqueueSubscription.unsubscribe();
    this.dequeueSubscription.unsubscribe();
  }

  playNow(song: Song): void {
    if (this.playing) {
      this.played.push(this.playing);
    }
    this.playing = song;
    this.nextSong.emit(song);
    console.log(this.played);
    console.log(this.queue);
  }

  playNext(): void {
    if (this.playing) {
      this.played.push(this.playing);
    }
    if (this.queue.length) {
      this.playing = <Song> this.queue.shift();
      this.nextSong.emit(this.playing);
    }
    console.log(this.played);
    console.log(this.queue);
  }

  playPrevious(): void {
    if (this.playing) {
      this.queue.unshift(this.playing);
    }
    if (this.played.length) {
      this.playing = <Song> this.played.pop();
      this.nextSong.emit(this.playing);
    }
    console.log(this.played);
    console.log(this.queue);
  }

  drop(event: CdkDragDrop<Song[]>): void {
    moveItemInArray(this.queue, event.previousIndex, event.currentIndex);
  }

}
