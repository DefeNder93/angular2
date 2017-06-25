import {Injectable} from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {LocalStorage} from '../local-storage.service';
import {Config} from '../config.service';
import {Api} from '../api.service';
import {MessagesService} from '../messages.service';
import {User} from './user.model';
import {Observable} from 'rxjs/Rx';
import {Subject} from 'rxjs/Rx';

declare const hello: any;  // hello.js doesn't have updated typings file

@Injectable()
export class AuthService {

  private user: User = null;

  constructor(private config: Config, private api: Api, private messagesService: MessagesService, private localStorage: LocalStorage) {
  }

  // testAuth = () => {
  //   return this.api.testAuth().then(r => console.log('secured auth: ' + r.text()))
  //     .catch(r => this.messagesService.showError(r, 'Secured Auth Error'));
  // };

  getUser = () => this.user ? Observable.of(this.user) : this.api.getUser().map(u => this.user = u);

  saveUser = (user: User) => this.api.updateUser(user);

  isLoggedIn = () => this.localStorage.get('auth') !== null;

  logout = () => this.localStorage.set('auth', null);

  getCurrentProviderName = () => {
    const auth = this.localStorage.get('auth');
    return auth ? auth.provider : null;
  };

  authHandler = (auth, provider: string) => {
    const socialToken = auth.authResponse.access_token;
    return this.api.authSocial({
      network: provider,
      socialToken: socialToken
    });
  };

  addSocialHandler = (auth, provider: string, existingProvider: string, existingToken: string) => {
    const socialToken = auth.authResponse.access_token;
    return this.api.addSocial({
      network: provider,
      socialToken: socialToken,
      existingToken: existingToken,
      existingProvider: existingProvider
    });
  };

  login = (provider: string) => {
    const subject = new Subject();
    hello(provider).login({force: true}).then(r => {
      this.authHandler(r, provider).subscribe(token => {
        this.localStorage.set('auth', {token: token.text(), provider: provider});
        subject.complete();
      }, e => this.messagesService.rejectWithError(subject.error, e, 'Social Auth Error'));
    }, e => {
      this.messagesService.rejectWithError(subject.error, e, 'HelloJS Auth Error');
    });
    return subject;
  };

  addSocial = (provider: string) => {
    const auth = this.localStorage.get('auth');
    const existingToken = auth && auth.token;
    const existingProvider = auth && auth.provider;
    if (!this.checkParams(existingToken, existingProvider)) {
      return;
    }
    const subject = new Subject();
    hello(provider).login({force: true}).then(r => {
      this.addSocialHandler(r, provider, existingProvider, existingToken)
        .subscribe(s => subject.complete(), e => this.messagesService.rejectWithError(subject.error, r, 'Social Auth Error'));
    }, r => this.messagesService.rejectWithError(subject.error, r, 'HelloJS Auth Error'));
    return subject;
  };

  private checkParams = (existingToken, existingProvider) => {
    if (!existingToken || !existingProvider) {
      this.messagesService.showError('You should have at least one network');
    }
    return existingToken || existingProvider;
  };

  init = () => {
    this.initHello(this.config.get('GOOGLE_CLIENT_ID'), this.config.get('FACEBOOK_CLIENT_ID'), this.config.get('GITHUB_CLIENT_ID'));
    this.isLoggedIn() && this.getUser().subscribe(u => this.user = u);
  };

  private initHello = (googleId: string, facebookId: string, githubId: string) => {
    hello.init({
      google: googleId,
      facebook: facebookId,
      github: githubId
    }, {
      oauth_proxy: this.config.get('OAUTH_PROXY') || 'https://auth-server.herokuapp.com/proxy'
    });
  };
}
