import {Injectable} from '@angular/core';
import {Config} from './Config.service';
@Injectable()
export class LocalStorage {

  constructor(private _config: Config) {}

  // TODO find a way how to customize app prefix (consider usage in /src/app/override/InterceptedHttp.ts)
  set(key: string, item: any, prefix?: string) {
    localStorage.setItem(this.getPrefix(prefix) + key, this.getItemAsString(item));
  }

  getItemAsString(item: any) {
    if (item !== null && typeof item === 'object') {
      return JSON.stringify(item);
    }
    return item;
  }

  getItemFromString(str: string) {
    if (this.isJsonString(str)) {
      return JSON.parse(str);
    }
    return str;
  }

  private isJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  get(key: string, prefix?: string): any {
    return this.getItemFromString(localStorage.getItem(this.getPrefix(prefix) + key));
  }

  private getPrefix = (prefix) => prefix || this._config.get('APP_PREFIX') || 'app_'
}
