import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  constructor(public restService: RestService) { }

  ngOnInit(): void {
    this.loadPlaylist();
  }

  choosePlaylist(playlist: Playlist) {
    this.chosenPlaylist = playlist;
    this.chosenSongs = playlist.songs;
  }

  playSong(song: Song) {
    this.chosenSong.emit(song);
  }

  loadPlaylist() {
    return this.restService.getPlaylists().subscribe((data: Rest) => {
      this.playlists = data.results;
    })
  }

}
