import {Injectable} from '@angular/core';
import {Config} from './Config.service';
@Injectable()
export class LocalStorage {

  constructor(private _config: Config) {}

  set = (key: string, item: any) => localStorage.setItem(this.getPrefix() + key, this.getItemAsString(item));

  getItemAsString = (item: any) => item !== null && typeof item === 'object' ? JSON.stringify(item) : item;

  getItemFromString = (str: string) => this.isJsonString(str) ? JSON.parse(str) : str;

  get = (key: string): any => this.getItemFromString(localStorage.getItem(this.getPrefix() + key));

  private getPrefix = () => this._config.get('LOCAL_STORAGE_PREFIX') || 'app_';

  private isJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
}
