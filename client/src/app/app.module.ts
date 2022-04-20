import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSliderModule } from '@angular/material/slider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlbumComponent } from './album/album.component';
import { PlaylistsComponent } from './playlists/playlists.component'

import { RestService } from './services/rest.service';

@NgModule({
  declarations: [
    AppComponent,
    AlbumComponent,
    PlaylistsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatSliderModule
  ],
  providers: [RestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
