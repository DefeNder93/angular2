import {Injectable} from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {LocalStorage} from '../local-storage.service';
import {Config} from '../config.service';
import {Api} from '../api.service';
import {MessagesService} from '../messages.service';
import {User} from '../../models/user.model';

declare const hello: any;  // hello.js doesn't have updated typings file

@Injectable()
export class AuthService {

  private user: User = null;

  constructor(private _config: Config, private _api: Api, private _messages: MessagesService, private _localStorage: LocalStorage) {
  }

  testAuth = () => {
    return this._api.testAuth().then(r => console.log('secured auth: ' + r.text()))
      .catch(r => this._messages.showError(r, 'Secured Auth Error'));
  };

  getUser = () => this.user ? Promise.resolve(this.user) : this._api.getUser().then(r => r.json());

  saveUser = (user: User) => this._api.updateUser(user);

  isLoggedIn = () => this._localStorage.get('auth') !== null;

  logout = () => this._localStorage.set('auth', null);

  getCurrentProviderName = () => {
    const auth = this._localStorage.get('auth');
    return auth ? auth.provider : null;
  };

  authHandler = (auth, provider: string) => {
    const socialToken = auth.authResponse.access_token;
    return this._api.authSocial({
      network: provider,
      socialToken: socialToken
    });
  };

  addSocialHandler = (auth, provider: string, existingProvider: string, existingToken: string) => {
    const socialToken = auth.authResponse.access_token;
    return this._api.addSocial({
      network: provider,
      socialToken: socialToken,
      existingToken: existingToken,
      existingProvider: existingProvider
    });
  };

  login = (provider: string) => {
    return new Promise<string>((resolve, reject) => {
      hello(provider).login({force: true}).then(r => {
        this.authHandler(r, provider).then(token => {
          this._localStorage.set('auth', {token: token.text(), provider: provider});
          resolve();
        }).catch(e => this._messages.rejectWithError(reject, e, 'Social Auth Error'));
      }, e => {
        this._messages.rejectWithError(reject, e, 'HelloJS Auth Error');
      });
    });
  };

  addSocial = (provider: string) => {
    const auth = this._localStorage.get('auth');
    const existingToken = auth && auth.token;
    const existingProvider = auth && auth.provider;
    if (!this.checkParams(existingToken, existingProvider)) {
      return;
    }
    return new Promise<string>((resolve, reject) => {
      hello(provider).login({force: true}).then(r => {
        this.addSocialHandler(r, provider, existingProvider, existingToken).then(s => resolve())
          .catch(e => this._messages.rejectWithError(reject, r, 'Social Auth Error'));
      }, r => this._messages.rejectWithError(reject, r, 'HelloJS Auth Error'));
    });
  };

  private checkParams = (existingToken, existingProvider) => {
    if (!existingToken || !existingProvider) {
      this._messages.showError('You should have at least one network');
    }
    return existingToken || existingProvider;
  };

  init = () => {
    this.initHello(this._config.get('GOOGLE_CLIENT_ID'), this._config.get('FACEBOOK_CLIENT_ID'), this._config.get('GITHUB_CLIENT_ID'));
    this.isLoggedIn() && this._api.getUser().then(r => this.user = r.json());
  };

  private initHello = (googleId: string, facebookId: string, githubId: string) => {
    hello.init({
      google: googleId,
      facebook: facebookId,
      github: githubId
    }, {
      oauth_proxy: this._config.get('OAUTH_PROXY') || 'https://auth-server.herokuapp.com/proxy'
    });
  };
}
