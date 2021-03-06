import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Config} from './config.service';
import {User} from './auth/user.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class Api {

  private host: string;

  constructor(private http: Http, private config: Config) {
    this.host = config.get('HOST');
  }

  authSocial = (data) => this.http.post(this.host + '/auth/social', data).toPromise();

  addSocial = (data) => this.http.post(this.host + '/auth/add-social', data).toPromise();

  getUser = () => this.http.get(this.host + '/auth/user').map(this.extractData);

  private extractData = (res) => res.json() || null;

  updateUser = (user: User) => this.http.put(this.host + '/auth/user', user).toPromise();

  testAuth = () => this.http.get(this.host + '3000/auth/secured').toPromise();

}
