import { Component, Input} from '@angular/core';
import { RestService } from '../services/rest.service';
import { Song } from '../types/music';

@Component({
  selector: 'app-lyrics',
  templateUrl: './lyrics.component.html',
  styleUrls: ['./lyrics.component.css']
})
export class LyricsComponent {
  lyrics:string = "No lyrics retrieved.";
  retrievingLyrics:boolean = false;

  @Input() set song(value:Song) {
    if (value && value.title) {
      this.retrievingLyrics = true;
      this.loadLyrics(value);
    }
  }

  constructor(private restService: RestService) { }

  private loadLyrics(song: Song): void {
    this.restService.getLyrics(song).subscribe(lyrics => {
      this.retrievingLyrics = false;
      this.lyrics = lyrics;
    });
  }

}
