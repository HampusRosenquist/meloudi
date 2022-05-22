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
  private enqueueSubscription!: Subscription;
  private dequeueSubscription!: Subscription;

  @Input() audioFile!: any;
  @Output() nextSong = new EventEmitter<Song>();

  constructor(private shareService: ShareService) { }

  ngOnInit(): void {
    this.enqueueSubscription = this.shareService.getEnqueued().subscribe(song =>
      this.queue.push(song)
    );
    this.dequeueSubscription = this.shareService.getDequeueNotification().subscribe(() =>
      this.queue.pop()
    );
    this.audioFile.addEventListener('ended', () => {
      if (this.queue.length) {
        this.nextSong.emit(this.queue.shift());
      }
    });
  }

  ngOnDestroy(): void {
    this.enqueueSubscription.unsubscribe();
    this.dequeueSubscription.unsubscribe();
  }

  playNext(): void {

  }

  drop(event: CdkDragDrop<Song[]>): void {
    moveItemInArray(this.queue, event.previousIndex, event.currentIndex);
  }

}
