import { Component, OnInit } from '@angular/core';
import {Auth} from "../common/auth/Auth.service";
import {Config} from "../common/Config.service";

@Component({
  selector: 'app-login',
  template: `
    <div *ngIf="!isLoggedIn()" class="login-form">
      <p>Login with:</p>
      <p>
        <i (click)="login('facebook')" class="fa fa-facebook-square"></i>
        <i (click)="login('github')" class="fa fa-github"></i>
        <i (click)="login('google')" class="fa fa-google-plus"></i>
      </p>
    </div>
    <div *ngIf="isLoggedIn()" class="login-form">
      You are logged in with ... . You can <button (click)="logout()" pButton type="button" label="Logout"></button>
    </div>
  `,
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _auth: Auth) { }

  ngOnInit() {
  }

  isLoggedIn = this._auth.isLoggedIn;
  logout = this._auth.logout;
  login = this._auth.login;

  testAuth() {
    this._auth.testAuth();
  }

}
