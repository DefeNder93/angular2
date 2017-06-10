import {Injectable} from '@angular/core';
import {Config} from './config.service';
@Injectable()
export class LocalStorage {

  constructor(private config: Config) {
  }

  set = (key: string, item: any) => localStorage.setItem(this.getPrefix() + key, this.getItemAsString(item));

  get = (key: string): any => this.getItemFromString(localStorage.getItem(this.getPrefix() + key));

  private getPrefix = () => this.config.get('LOCAL_STORAGE_PREFIX') || 'app_';

  private getItemAsString = (item: any) => item !== null && typeof item === 'object' ? JSON.stringify(item) : item;

  private getItemFromString = (str: string) => this.isJsonString(str) ? JSON.parse(str) : str;

  private isJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
}
