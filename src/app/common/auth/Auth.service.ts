import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {LocalStorage} from "../LocalStorage.service";
import {Config} from "../Config.service";

declare var hello: any;  // hello.js doesn't have updated typings file

@Injectable()
export class Auth {

  constructor (private _http: Http, private _config: Config) {}

  authSocial(data) {
    return this._http.post('http://localhost:3000/auth/social', data)
      .toPromise()
      .then(function(r){
        LocalStorage.set('token', r.text())
      })
      .catch(function(r){
        console.log('catch auth social');
        console.log(r);
      });
  }

  testAuth() {
    return this._http.get('http://localhost:3000/auth/secured')
      .toPromise()
      .then(function(r){
        console.log('secured auth: ' + r.text());
      })
      .catch(function(r){
        console.log('secured auth error');
        console.log(r);
      });
  }

  init() {
    let _this = this;
    this._config.get().then(function(config){
      _this.initHello(config['GOOGLE_CLIENT_ID'], config['FACEBOOK_CLIENT_ID'], config['GITHUB_CLIENT_ID']);
      _this.setOnAuthHandler();
    });
  }

  private initHello(googleId: string, facebookId: string, githubId: string) {
    hello.init({
      google: googleId,
      facebook: facebookId,
      github: githubId
    }, {
      //redirect_uri: 'redirect.html'
    });
  }

  private setOnAuthHandler() {
    let _this = this;
    hello.on('auth.login', function (auth) {
      hello(auth.network).api('/me').then(function (r) {
        let socialToken = auth.authResponse.access_token;
        _this.authSocial({
          network: auth.network,
          socialToken: socialToken
        });
      });
    });
  }
}
