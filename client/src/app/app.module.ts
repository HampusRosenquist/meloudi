import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlbumComponent } from './album/album.component';
import { DialogEdit, DialogEnsure, PlaylistsComponent } from './playlists/playlists.component'

import { RestService } from './services/rest.service';

@NgModule({
  declarations: [
    AppComponent,
    AlbumComponent,
    PlaylistsComponent,
    DialogEdit,
    DialogEnsure
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatListModule,
    MatSliderModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [RestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
