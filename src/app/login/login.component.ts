import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthService} from '../core/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoggedIn = this.authService.isLoggedIn;
  getCurrentProviderName = this.authService.getCurrentProviderName;

  constructor(private authService: AuthService, private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  logout = () => {
    this.authService.logout();
    this.changeDetectorRef.detectChanges();
  };

  login = (provider: string) => this.authService.login(provider)
    .then(r => this.changeDetectorRef.detectChanges());

  testAuth() {
    this.authService.testAuth();
  }

}
