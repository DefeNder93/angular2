import { Injectable }    from '@angular/core';
import { Http }          from '@angular/http';

@Injectable()
export class Api {

  constructor (private _http: Http) {}

  authSocial = (data) => {
    return this._http.post('http://localhost:3000/auth/social', data).toPromise();
  };

  testAuth = () => {
    return this._http.get('http://localhost:3000/auth/secured').toPromise();
  };

}
