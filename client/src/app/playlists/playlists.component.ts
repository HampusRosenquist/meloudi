import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RestService } from '../services/rest.service';
import { Song } from '../types/music';
import { Rest } from '../types/rest';
import { Playlist } from '../types/user';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {
  playlists: Playlist[] = [];
  chosenPlaylist = <Playlist>{};
  chosenSongs: Song[] = [];

  @Output() chosenSong = new EventEmitter<Song>();

  constructor(public restService: RestService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadPlaylist();
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

  loadPlaylist() {
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

  openEditDialog(): void {
    const dialogRef = this.dialog.open(DialogEdit, {
      width: '250px',
      data: {
        title: this.chosenPlaylist.title,
        description: this.chosenPlaylist.description
      },
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
      console.log(`Dialog result: ${result}`);
      this.restService.deletePlaylist(this.chosenPlaylist.id).subscribe();
      
      const index = this.playlists.indexOf(this.chosenPlaylist);
      if (index > -1) {
        this.playlists.splice(index, 1);
      }
      this.deselectChosenPlalist();
    });
  }

}

export interface DialogData {
  title: string;
  description: string;

}

@Component({
  selector: 'dialog-edit',
  templateUrl: 'dialog-edit.html',
})
export class DialogEdit {
  constructor(
    public dialogRef: MatDialogRef<DialogEdit>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}
}

@Component({
  selector: 'dialog-ensure',
  templateUrl: 'dialog-ensure.html',
})
export class DialogEnsure {}
