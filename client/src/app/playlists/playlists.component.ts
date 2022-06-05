import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@auth0/auth0-angular';
import { Subscription } from 'rxjs';
import { DialogAdd } from '../dialogs/dialog-add';
import { DialogCreate } from '../dialogs/dialog-create';
import { DialogEdit } from '../dialogs/dialog-edit';
import { DialogEnsure } from '../dialogs/dialog-ensure';
import { RestService } from '../services/rest.service';
import { ShareService } from '../services/share.service';
import { Song } from '../types/music';
import { Playlist, PlaylistWrite } from '../types/user';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})

export class PlaylistsComponent implements OnInit {
  playlists:Playlist[] = [];
  chosenPlaylist:Playlist = <Playlist>{};
  chosenSongs:Song[] = [];
  subscription!:Subscription;
  loadingData:boolean = true;

  @Input() songs: Song[] = [];
  @Output() chosenSong = new EventEmitter<Song>();
  @Output() isWriting = new EventEmitter<boolean>();

  constructor(
    private restService: RestService,
    private shareService: ShareService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe({
      next: (isAuthenticated) => {
        if (isAuthenticated) {
          this.loadPlaylists();
        } else {
          this.loadingData = false;
        }
      }
    })
  }

  choosePlaylist(playlist: Playlist): void {
    this.chosenPlaylist = playlist;
    this.chosenSongs = playlist.songs_data;
  }

  private deselectChosenPlalist(): void {
    this.chosenPlaylist = <Playlist>{};
    this.chosenSongs = [];
  }

  playSong(song: Song): void {
    this.chosenSong.emit(song);
  }

  private loadPlaylists() {
    console.log("load");
    return this.restService.getPlaylists().subscribe((playlists: Playlist[]) => {
      this.playlists = playlists;
      this.loadingData = false;
    })
  }

  toggleIsPublic(value: boolean): void {
    this.chosenPlaylist.is_public = value;
    this.updateChosenPlaylist();
  }

  private updateChosenPlaylist(): void {
    this.restService.updatePlaylist(this.chosenPlaylist).subscribe();
  }

  private createPlayist(playlist: PlaylistWrite): void {
    this.restService.createPlaylist(playlist).subscribe((playlist: Playlist) => {
      this.playlists.push(playlist);
    });
  }

  openEditDialog(): void {
    this.isWriting.emit(true);

    const dialogRef = this.dialog.open(DialogEdit, {
      width: '250px',
      data: {
        title: this.chosenPlaylist.title,
        description: this.chosenPlaylist.description
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isWriting.emit(false);

      if (result) {
        this.chosenPlaylist.title = result.title;
        this.chosenPlaylist.description = result.description;
        this.updateChosenPlaylist();
      }
    });
  }

  openDeleteDialog(): void {
    this.isWriting.emit(true);

    const dialogRef = this.dialog.open(DialogEnsure);

    dialogRef.afterClosed().subscribe(result => {
      this.isWriting.emit(false);

      if (result) {
        this.restService.deletePlaylist(this.chosenPlaylist.id).subscribe();
        
        const index = this.playlists.indexOf(this.chosenPlaylist);
        if (index > -1) {
          this.playlists.splice(index, 1);
        }
        this.deselectChosenPlalist();
      }
    });
  }

  openNewPlaylistDialog(): void {
    this.isWriting.emit(true);

    const dialogRef = this.dialog.open(DialogCreate, { width: '250px' });

    dialogRef.afterClosed().subscribe(result => {
      this.isWriting.emit(false);

      if (result) {
        const playlist = <PlaylistWrite>{
          title: result.title,
          description: result.description,
          songs: [],
          is_public: result.isPublic
        };
        this.createPlayist(playlist);
      }
    });
  }

  openAddSongDialog(): void {
    this.isWriting.emit(true);

    const dialogRef = this.dialog.open(DialogAdd, {
      width: '400px',
      data: this.songs
    });

    dialogRef.afterClosed().subscribe(song => {
      this.isWriting.emit(false);

      if (song) {
        this.chosenPlaylist.songs.push('http://127.0.0.1:8000/songs/' + song.id + '/');
        this.chosenPlaylist.songs_data.push(song);
        this.updateChosenPlaylist();
      }
    })
  }

  removeSong(song: Song): void {
    let _snackBar = this.snackBar.open("Removed " + song.title, 'Undo', {
      duration: 3000
    });

    let index:number = this.chosenSongs.indexOf(song);
    if (index != -1) {
      this.chosenSongs.splice(index, 1);
    
      _snackBar.afterDismissed().subscribe(info => {
        if (info.dismissedByAction === true) { // User pressed 'Undo'.
          this.chosenSongs.splice(index, 0, song);
        } else {
          this.chosenPlaylist.songs.splice(index, 1);
          this.updateChosenPlaylist();
        }
      });
    }
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