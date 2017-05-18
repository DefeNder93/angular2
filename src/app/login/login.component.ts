import { Component, OnInit } from '@angular/core';
import {Auth} from "../common/auth/Auth.service";

@Component({
  selector: 'app-login',
  providers: [Auth],
  template: `
    <button onclick="hello('google').login()">Google</button>
    <button (click)="testAuth()">Test Auth</button>
`,
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _auth: Auth) { }

  ngOnInit() {
  }

  testAuth() {
    this._auth.testAuth();
  }

}
