import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';

@Injectable()
export class Config {

  constructor (private http: Http) {}
  private _config: Object;

  private getConfig(key: string) {
    let _this = this;
    return this.http.get('assets/config.json')
      .toPromise()
      .then(function(r){
        _this._config = r.json();
        return _this.getResolvedConfig(key);
      })
      .catch(function(r){
        console.log('get config error');
        console.log(r);
      });
  }

  private getResolvedConfig(key: string) {
    return key ? Promise.resolve(this._config[key]) : Promise.resolve(this._config)
  }

  get(key?: string): Promise<void> {
    return this._config ? this.getResolvedConfig(key) : this.getConfig(key);
  }
}
