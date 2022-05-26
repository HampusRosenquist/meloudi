import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Song } from '../types/music'

@Injectable({
  providedIn: 'root'
})

export class ShareService {
  private queue = new Subject<Song>();
  private dequeueNotification = new Subject<boolean>();
  private clearQueueNotification = new Subject<boolean>();

  public getEnqueued(): Observable<Song> {
    return this.queue.asObservable();
  }

  public enqueue(song: Song): void {
    this.queue.next(song);
  }

  public getDequeueNotification(): Observable<boolean> {
    return this.dequeueNotification.asObservable();
  }

  public dequeue(): void {
    this.dequeueNotification.next(true);
  }

  public getClearQueueNotification(): Observable<boolean> {
    return this.clearQueueNotification.asObservable();
  }

  public clearQueue(): void {
    this.clearQueueNotification.next(true);
  }
}