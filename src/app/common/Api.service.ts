import { Injectable }    from '@angular/core';
import { Http }          from '@angular/http';

@Injectable()
export class Api {

  constructor (private _http: Http) {}

  private host = 'http://localhost:3000'; // TODO move to config

  authSocial = (data) => this._http.post(this.host + '/auth/social', data).toPromise();

  addSocial = (data) => this._http.post(this.host + '/auth/add-social', data).toPromise();

  getUser = () => this._http.get(this.host + '/auth/user').toPromise();

  updateUser = (user: object) => this._http.put(this.host + '/auth/user', user).toPromise();

  testAuth = () => this._http.get(this.host + '3000/auth/secured').toPromise();

}
