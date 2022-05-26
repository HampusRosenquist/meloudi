import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AuthModule, AuthHttpInterceptor } from '@auth0/auth0-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LibraryComponent } from './library/library.component';
import { PlaylistsComponent } from './playlists/playlists.component'

import { RestService } from './services/rest.service';

import { DialogEdit } from './dialogs/dialog-edit';
import { DialogEnsure } from './dialogs/dialog-ensure';
import { DialogCreate } from './dialogs/dialog-create';
import { DialogAdd } from './dialogs/dialog-add';
import { QueueComponent } from './queue/queue.component';
import { ShareService } from './services/share.service';
import { AuthButtonComponent } from './auth-button/auth-button.component';
import { ProfileComponent } from './profile/profile.component';
import { FriendsComponent } from './friends/friends.component';

@NgModule({
  declarations: [
    AppComponent,
    LibraryComponent,
    PlaylistsComponent,
    DialogEdit,
    DialogEnsure,
    DialogCreate,
    DialogAdd,
    QueueComponent,
    AuthButtonComponent,
    ProfileComponent,
    FriendsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatListModule,
    MatSliderModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatTabsModule,
    DragDropModule,
    AuthModule.forRoot({
      domain: 'dev-yehja2pp.eu.auth0.com',
      clientId: 'JuB0hLExJbYhZmGQW5P8svR4HybgsvaO',
      audience: 'https://meloudi/api',
      httpInterceptor: {
        allowedList: [
          {
            uri: 'http://localhost:8000/playlists/*',
            tokenOptions: {
              audience: 'https://meloudi/api'
            }
          },
          {
            uri: 'http://localhost:8000/users/*',
            tokenOptions: {
              audience: 'https://meloudi/api'
            }
          },
          {
            uri: 'http://localhost:8000/friends/*',
            tokenOptions: {
              audience: 'https://meloudi/api'
            }
          }
        ]
      }
    })
  ],
  providers: [
    RestService,
    ShareService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
