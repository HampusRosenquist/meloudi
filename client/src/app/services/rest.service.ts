import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { Rest } from '../types/rest'
import { Playlist, PlaylistWrite } from '../types/user';
import { Song } from '../types/music';

@Injectable({
  providedIn: 'root'
})

export class RestService {
  private baseUrl = 'http://localhost:8000';
  private artistsUrl = this.baseUrl + '/artists/';
  private songUrl = this.baseUrl + '/songs/';
  private albumUrl = this.baseUrl + '/albums/';
  private playlistsUrl = this.baseUrl + '/playlists/';
  private friendsUrl = this.baseUrl + '/friends/';
  private lyricsUrl = this.baseUrl + '/lyrics/'

  constructor(private http: HttpClient) { }

  getArtists(): Observable<Rest> {
    return this.http
      .get<Rest>(this.artistsUrl)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  getAlbums(): Observable<Rest> {
    return this.http
      .get<Rest>(this.albumUrl)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  getSongs(): Observable<Rest> {
    return this.http
      .get<Rest>(this.songUrl)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  getPlaylists(): Observable<Playlist[]> {
    return this.http
      .get<Playlist[]>(this.playlistsUrl)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  updatePlaylist(playlist: Playlist): Observable<Playlist> {
    return this.http
    .put<Playlist>(this.playlistsUrl + playlist.id + '/', playlist)
    .pipe(retry(1), catchError(this.errorHandl));
  }

  deletePlaylist(playlistId: number) {
    return this.http
      .delete(this.playlistsUrl + playlistId + '/');
  }

  createPlaylist(playlist: PlaylistWrite): Observable<Playlist> {
    return this.http
      .post<Playlist>(this.playlistsUrl, playlist)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  getFriendsPlaylists(): Observable<Playlist[]> {
    return this.http
      .get<Playlist[]>(this.friendsUrl)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  getLyrics(song: Song): Observable<string> {
    let params = '?title="' + song.title + '"&artist="' + song.artist_name;
    return this.http
      .get(this.lyricsUrl + params, {responseType: 'text'})
      .pipe(retry(1), catchError(this.errorHandl));
  }

  private errorHandl(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
