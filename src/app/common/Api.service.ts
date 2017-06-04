import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Config} from './Config.service';

@Injectable()
export class Api {

  private host: string;

  constructor (private _http: Http, private _config: Config) {
    this.host = _config.get('HOST');
  }

  authSocial = (data) => this._http.post(this.host + '/auth/social', data).toPromise();

  addSocial = (data) => this._http.post(this.host + '/auth/add-social', data).toPromise();

  getUser = () => this._http.get(this.host + '/auth/user').toPromise();

  updateUser = (user: object) => this._http.put(this.host + '/auth/user', user).toPromise();

  testAuth = () => this._http.get(this.host + '3000/auth/secured').toPromise();

}
