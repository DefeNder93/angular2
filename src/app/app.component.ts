import { Component } from '@angular/core';
import {Http} from "@angular/http";
import {Auth} from "./common/auth/Auth.service";
import {Config} from "./common/Config.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [Auth, Config]
})
export class AppComponent {
  constructor(private http: Http, private auth: Auth) {
    console.log('it works');
  }

  ngOnInit() {
    this.http.get('http://localhost:3000/user')
      .subscribe(data => {
        console.log('test db (user)');
        console.log(data);
      });

    this.auth.init();
  }

  title = 'app works!';
}
