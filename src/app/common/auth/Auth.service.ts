import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {LocalStorage} from "../LocalStorage.service";

declare var hello: any;  // hello.js doesn't have updated typings file

@Injectable()
export class Auth {

  constructor (private http: Http) {}

  authSocial(data) {
    return this.http.post('http://localhost:3000/auth/social', data)
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
    return this.http.get('http://localhost:3000/auth/secured')
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
    hello.init({
      google: '995361108283-ktr1i7ufe37rihcoin7toqch9faqvr8f.apps.googleusercontent.com'
    }, {
      redirect_uri: 'redirect.html'
    });

    var _this = this;
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
