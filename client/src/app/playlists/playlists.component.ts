import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DialogAdd } from '../dialogs/dialog-add';
import { DialogCreate } from '../dialogs/dialog-create';
import { DialogEdit } from '../dialogs/dialog-edit';
import { DialogEnsure } from '../dialogs/dialog-ensure';
import { RestService } from '../services/rest.service';
import { Song } from '../types/music';
import { Rest } from '../types/rest';
import { Playlist, PlaylistWrite } from '../types/user';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {
  playlists: Playlist[] = [];
  chosenPlaylist = <Playlist>{};
  chosenSongs: Song[] = [];
  subscription!: Subscription;

  @Input() songs: Song[] = [];
  @Output() chosenSong = new EventEmitter<Song>();

  constructor(
    private restService: RestService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadPlaylists();
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

  loadPlaylists() {
    return this.restService.getPlaylists().subscribe((data: Rest) => {
      this.playlists = data.results;
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
    const dialogRef = this.dialog.open(DialogEdit, {
      width: '250px',
      data: {
        title: this.chosenPlaylist.title,
        description: this.chosenPlaylist.description
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.chosenPlaylist.title = result.title;
        this.chosenPlaylist.description = result.description;
        this.updateChosenPlaylist();
      }
    });
  }

  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DialogEnsure);

    dialogRef.afterClosed().subscribe(result => {
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
    const dialogRef = this.dialog.open(DialogCreate, { width: '250px' });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const playlist = <PlaylistWrite>{
          owner: "http://127.0.0.1:8000/users/1/",
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
    const dialogRef = this.dialog.open(DialogAdd, {
      width: '400px',
      data: this.songs
    });

    dialogRef.afterClosed().subscribe(song => {
      if (song) {
        this.chosenPlaylist.songs.push('http://127.0.0.1:8000/songs/' + song.id + '/');
        this.chosenPlaylist.songs_data.push(song);
        this.updateChosenPlaylist();
      }
    })
  }

}