import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@auth0/auth0-angular';
import { RestService } from '../services/rest.service';
import { ShareService } from '../services/share.service';
import { Song } from '../types/music';
import { Playlist } from '../types/user';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  playlists:Playlist[] = [];
  chosenPlaylist:Playlist = <Playlist>{};
  chosenSongs:Song[] = [];
  loadingData:boolean = true;

  @Output() chosenSong = new EventEmitter<Song>();
  
  constructor(
    private restService: RestService,
    private shareService: ShareService,
    private snackBar: MatSnackBar,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    this.loadPlaylists();
  }

  private loadPlaylists() {
    return this.restService.getFriendsPlaylists().subscribe((playlists: Playlist[]) => {
      this.playlists = playlists;
      this.loadingData = false;
    })
  }

  choosePlaylist(playlist: Playlist): void {
    this.chosenPlaylist = playlist;
    this.chosenSongs = playlist.songs_data;
  }

  playSong(song: Song): void {
    this.chosenSong.emit(song);
  }

  enqueueSong(song: Song): boolean {
    this.shareService.enqueue(song);
    
    let _snackBar = this.snackBar.open("Enqueued " + song.title, 'Undo', {
        duration: 3000
    });

    _snackBar.afterDismissed().subscribe(info => {
        if (info.dismissedByAction === true) { // User pressed 'Undo'.
            this.shareService.dequeue();
        }
    });
    return false;
  }

  enqueuePlaylist(playlist: Playlist): boolean {
    playlist.songs_data.forEach(song => {
        this.shareService.enqueue(song);
    });

    let _snackBar = this.snackBar.open("Enqueued " + playlist.title, 'Undo', {
        duration: 3000
    });

    _snackBar.afterDismissed().subscribe(info => {
        if (info.dismissedByAction === true) { // User pressed 'Undo'.
            for (let i = 0; i < playlist.songs_data.length; i++) {
                this.shareService.dequeue();
            }
        }
    });
    return false;
  }

  playChosenPlaylist(): void {
    if (this.chosenSongs.length) {
      this.playSong(this.chosenSongs[0]);
      this.shareService.clearQueue();
      this.chosenSongs.slice(1).forEach(song => {
        this.shareService.enqueue(song);
      });
    }
  }
}
