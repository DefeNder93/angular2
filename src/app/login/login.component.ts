import { Component, OnInit } from '@angular/core';
import {Auth} from "../common/auth/Auth.service";
import {Config} from "../common/Config.service";

@Component({
  selector: 'app-login',
  providers: [Auth],
  //template: `<button onclick="hello('google').login()">Google</button>
  //  <button (click)="testAuth()">Test Auth</button>`,
  template: `
    <div class="login-form">
      <p>Login with:</p>
      <p>
        <i onclick="hello('facebook').login()" class="fa fa-facebook-square"></i>
        <i onclick="hello('github').login()" class="fa fa-github"></i>
        <i onclick="hello('google').login()" class="fa fa-google-plus"></i>
      </p>
    </div>
  `,
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _auth: Auth, private _config: Config) { }

  ngOnInit() {
  }

  testAuth() {
    this._auth.testAuth();
  }

}
