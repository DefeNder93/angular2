import {Injectable} from '@angular/core';
import {Config} from './Config.service';
@Injectable()
export class LocalStorage {

  constructor(private _config: Config) {}

  set(key: string, item: any) {
    localStorage.setItem(this.getPrefix() + key, this.getItemAsString(item));
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

  get(key: string): any {
    return this.getItemFromString(localStorage.getItem(this.getPrefix() + key));
  }

  private getPrefix = () => this._config.get('LOCAL_STORAGE_PREFIX') || 'app_'
}
