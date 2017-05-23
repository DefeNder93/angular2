import {ChangeDetectorRef, Injectable}              from '@angular/core';
import { Http, Response }          from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {LocalStorage} from "../LocalStorage.service";
import {Config} from "../Config.service";

declare let hello: any;  // hello.js doesn't have updated typings file

@Injectable()
export class Auth {

  constructor (private _http: Http, private _config: Config, private changeDetectorRef: ChangeDetectorRef) {}

  authSocial = (data) => {
    return this._http.post('http://localhost:3000/auth/social', data)
      .toPromise()
      .then(r => {
        LocalStorage.set('token', r.text());
        this.changeDetectorRef.detectChanges();
      })
      .catch(r => {
        console.log('auth social error');
        console.log(r);
      });
  };

  testAuth = () => {
    return this._http.get('http://localhost:3000/auth/secured')
      .toPromise()
      .then(r => {
        console.log('secured auth: ' + r.text());
      })
      .catch(r => {
        console.log('secured auth error');
        console.log(r);
      });
  };


  isLoggedIn = () => {
    return LocalStorage.get('token') !== 'null';
  };

  logout = () => {
    LocalStorage.set('token', null);
  };

  authHandler = (auth, provider: string) => {
    let socialToken = auth.authResponse.access_token;
    this.authSocial({
      network: provider,
      socialToken: socialToken
    });
  };

  login = (provider: string) => {
    hello(provider).login({force: true}).then(r => {
      this.authHandler(r, provider)
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
