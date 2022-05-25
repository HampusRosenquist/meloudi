import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { concatMap, pluck, tap } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  accessToken:String = "";
  metadata = {};

    constructor(public auth: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    /*this.auth.user$
    .pipe(
      concatMap((user) =>
        this.http.get(
          encodeURI(`https://dev-yehja2pp.eu.auth0.com/oauth/token`)
        )
      ),
      pluck('access_token'),
      tap((token) => (this.accessToken = <String> token))
    )
    .subscribe();*/
  }

}
