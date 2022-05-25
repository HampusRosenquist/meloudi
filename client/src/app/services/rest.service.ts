import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { Rest } from '../types/rest'
import { Playlist, PlaylistWrite } from '../types/user';
import { AuthService } from '@auth0/auth0-angular';
import createAuth0Client, { Auth0Client } from '@auth0/auth0-spa-js';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private baseUrl = 'http://localhost:8000';
  private artistsUrl = this.baseUrl + '/artists/';
  private songUrl = this.baseUrl + '/songs/';
  private albumUrl = this.baseUrl + '/albums/';
  private playlistsUrl = this.baseUrl + '/playlists/';

  private access_token = "";
  private httpOptions = {};
  private auth0!: Promise<Auth0Client>;

  constructor(private http: HttpClient, private auth: AuthService) {
    /*
    //this.createRequest("");
    this.auth0 = createAuth0Client({
      domain: 'dev-yehja2pp.eu.auth0.com',
      client_id: 'JuB0hLExJbYhZmGQW5P8svR4HybgsvaO'
    });
    this.login(); */
      
   }

   async login(): Promise<void> {
    (await this.auth0).loginWithRedirect({
      redirect_uri: 'http://127.0.0.1:4200'
    });
    //logged in. you can get the user profile like this:
    const user = (await this.auth0).getUser();
    console.log(user);
    const accessToken = (await this.auth0).getTokenSilently();
    console.log(accessToken);
   }

  private createRequest(body: any): any {
    this.auth.getAccessTokenSilently().subscribe(token => {
      console.log("token " + token);
      this.access_token = token;
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.access_token}`
        }),
      };
    });    
  }

  /*curl --request POST \
  --url https://dev-yehja2pp.eu.auth0.com/oauth/token \
  --header 'content-type: application/json' \
  --data '{"client_id":"JuB0hLExJbYhZmGQW5P8svR4HybgsvaO","client_secret":"ks9ppvS5FS2y3Wiq3oe8aBtxY0mZQYE38gbPgwvdMXM3whrnu14Fzz6n6tGONWYi", "audience":"https://meloudi/api","grant_type":"client_credentials"}'
  */
  //eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InVGMl9pVW9DQm5yS0xCeHJ3aDhpZSJ9.eyJpc3MiOiJodHRwczovL2Rldi15ZWhqYTJwcC5ldS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjI4Y2Y5MzY2YmRkM2QwMDZmMTRkZDg5IiwiYXVkIjpbImh0dHBzOi8vZGV2LXllaGphMnBwLmV1LmF1dGgwLmNvbS9hcGkvdjIvIiwiaHR0cHM6Ly9kZXYteWVoamEycHAuZXUuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY1MzQzOTAwMiwiZXhwIjoxNjUzNTI1NDAyLCJhenAiOiJKdUIwaExFeEpiWWhabUdRVzVQOHN2UjRIeWJnc3ZhTyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgcmVhZDpjdXJyZW50X3VzZXIifQ.KlOFczFkSaCIVFwYjIsY8zkJ_OzEPryg2Yi_2jpb9zc5sdeiyHuk3w9Wbpi1EtZHpbUgj4E2PQ6-8s6fqwWkkr-3okVWWPXdl7iSB8O1LuJKzA3g8UmDC4ydmBrTl6Qs7y8kT9JEqMiQaH3k6dQet_kH0Imcwpr3TXuYHHtGD14B-xa7Jv3tfTQhf-WB-UHwMW1h6jctTe-DNR5tT98nVGALAq8Cp1RN7VkVIvNdUHhsL_UL7nSMuKEAxct5SNCqxKUWi_i2eouo5TjYj8GMNvz63pFs6RcELqre7d8bTmHSIIMH0_UJ-DvwerlRvMiC6Vfz8UBSSSXGTvUCpvOaWg
  //eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InVGMl9pVW9DQm5yS0xCeHJ3aDhpZSJ9.eyJpc3MiOiJodHRwczovL2Rldi15ZWhqYTJwcC5ldS5hdXRoMC5jb20vIiwic3ViIjoiMlNjZ2RTc1ZEYU8yZjUzMjhKU09zMUdxRkdEaUI3eFpAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vbWVsb3VkaS9hcGkiLCJpYXQiOjE2NTM0MzU0NzUsImV4cCI6MTY1MzUyMTg3NSwiYXpwIjoiMlNjZ2RTc1ZEYU8yZjUzMjhKU09zMUdxRkdEaUI3eFoiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.pXatUUImrSRYUKn-nIiGb87ueCtTJmwk5cl3X-3HJgGt7CE2GV0y4wMb2alz4C-g6QTxZ4R1RjwYIarnrgFtdOfwj5yVKlqhN3oHWXt_IxEjtzwRm-XrXnZ8jRHJWFW2SenqWEJiM4aK90Xx2Bz4Y2WmRAdmFfZJelbkgOUx-f-RZYgQKxvOFUOL1nF4RCHtUKQrhtqgr-551jXCbv6umJoahcTSnWKFG4ZMUY0kcVdzmdlebeQqDAo5RQkmfAV6pusMJGuTFHy0iF8Yjbz9Ls-hR9E81XkbpUGqYUmKIfYtEikRbMeAdkpw7BGmPvf13WfdENdF7ZxoSE0BcR8zZQ

  getArtists(): Observable<Rest> {
    return this.http
      .get<Rest>(this.artistsUrl, this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  getAlbums(): Observable<Rest> {
    return this.http
      .get<Rest>(this.albumUrl, this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  getSongs(): Observable<Rest> {
    return this.http
      .get<Rest>(this.songUrl, this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  getPlaylists(): Observable<Rest> {
    console.log(this.httpOptions);
    return this.http
      .get<Rest>(this.playlistsUrl)
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
