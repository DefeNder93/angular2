import {Injectable}              from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {LocalStorage} from '../LocalStorage.service';
import {Config} from '../Config.service';
import {Api} from '../Api.service';
import {Messages} from '../Messages.service';

declare let hello: any;  // hello.js doesn't have updated typings file

@Injectable()
export class Auth {

  constructor (private _config: Config, private _api: Api, private _messages: Messages) {}

  testAuth = () => {
    return this._api.testAuth().then(r => console.log('secured auth: ' + r.text()))
      .catch(r => this._messages.showError(r, 'Secured Auth Error'));
  };

  isLoggedIn = () => LocalStorage.get('auth') !== null;

  logout = () => LocalStorage.set('auth', null);

  getCurrentProviderName = () => {
    let auth = LocalStorage.get('auth');
    return auth = LocalStorage.get('auth') ? auth.provider : null;
  };

  authHandler = (auth, provider: string) => {
    let socialToken = auth.authResponse.access_token;
    return this._api.authSocial({
      network: provider,
      socialToken: socialToken
    });
  };

  addSocialHandler = (auth, provider: string, existingProvider: string, existingToken: string) => {
    let socialToken = auth.authResponse.access_token;
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
        this.authHandler(r, provider).then(r => {
            LocalStorage.set('auth', {token: r.text(), provider: provider});
            resolve();
          }).catch(r => this._messages.rejectWithError(reject, r, 'Social Auth Error'));
      }, r => this._messages.rejectWithError(reject, r, 'HelloJS Auth Error'));
    });
  };

  addSocial = (provider: string) => {
    let auth = LocalStorage.get('auth');
    let existingToken = auth && auth.token;
    let existingProvider = auth && auth.provider;
    if (!this.checkParams(existingToken, existingProvider)) return;
    return new Promise<string>((resolve, reject) => {
      hello(provider).login({force: true}).then(r => {
        this.addSocialHandler(r, provider, existingProvider, existingToken).then(r => resolve()).catch(r =>
          this._messages.rejectWithError(reject, r, 'Social Auth Error'));
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
    this._config.get().then(config => {
      this.initHello(config['GOOGLE_CLIENT_ID'], config['FACEBOOK_CLIENT_ID'], config['GITHUB_CLIENT_ID']);
    });
  };

  private initHello(googleId: string, facebookId: string, githubId: string) {
    hello.init({
      google: googleId,
      facebook: facebookId,
      github: githubId
    }, {
      //redirect_uri: 'redirect.html'
    });
  }
}
