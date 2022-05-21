import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Song } from '../types/music'

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  private songs = new Subject<Song[]>();
  sharedSongs = this.songs.asObservable();

  constructor() { }

  public getSongs(): Observable<Song[]> {
    return this.sharedSongs;
  }

  public updateSongs(songs: Song[]): void {
    this.songs.next(songs);
  }
}
