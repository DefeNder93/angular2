import {Injectable}              from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {LocalStorage} from "../LocalStorage.service";
import {Config} from "../Config.service";
import {Api} from "../Api.service";

declare let hello: any;  // hello.js doesn't have updated typings file

@Injectable()
export class Auth {

  constructor (private _config: Config, private _api: Api) {}

  testAuth = () => {
    return this._api.testAuth()
      .then(r => {
        console.log('secured auth: ' + r.text());
      })
      .catch(r => {
        console.log('secured auth error');
        console.log(r);
      });
  };

  isLoggedIn = () => LocalStorage.get('auth') !== null;

  logout = () => LocalStorage.set('auth', null);

  getCurrentProviderName = () => {
    let auth = LocalStorage.get('auth');
    return auth ? auth.provider : null;
  };

  authHandler = (auth, provider: string) => {
    let socialToken = auth.authResponse.access_token;
    return this._api.authSocial({
      network: provider,
      socialToken: socialToken
    });
  };

  login = (provider: string) => {
    return new Promise<string>((resolve, reject) => {
      hello(provider).login({force: true}).then(r => {
        this.authHandler(r, provider).then(r => {
            LocalStorage.set('auth', {token: r.text(), provider: provider});
            resolve();
          })
          .catch(r => {
            reject();
            console.log('auth social error');
            console.log(r);
          });
      }, r => {
        console.log('hello js auth social error');
        console.log(r);
      });
    });
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
