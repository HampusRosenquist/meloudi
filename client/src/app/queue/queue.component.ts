import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
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

  drop(event: CdkDragDrop<Song[]>): void {
    moveItemInArray(this.queue, event.previousIndex, event.currentIndex);
  }

}
