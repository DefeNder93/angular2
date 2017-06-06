import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Auth} from '../common/auth/auth.service';

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
      You are logged in with {{getCurrentProviderName()}} . You can <button (click)="logout()" pButton type="button" label="Logout"></button>
    </div>
  `,
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoggedIn = this._auth.isLoggedIn;
  getCurrentProviderName = this._auth.getCurrentProviderName;

  constructor(private _auth: Auth, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {}

  logout = () => {
    this._auth.logout();
    this.changeDetectorRef.detectChanges();
  };

  login = (provider: string) => {
    this._auth.login(provider).then(r => {
      this.changeDetectorRef.detectChanges();
    });
  };

  testAuth() {
    this._auth.testAuth();
  }

}
