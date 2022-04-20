import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Meloudi';
  isPlaying = false;

  toggleIsPlaying() {
    this.isPlaying = !this.isPlaying;
  }

  stop() {
    this.isPlaying = false;
  }
}
