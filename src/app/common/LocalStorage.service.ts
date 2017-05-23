export class LocalStorage {

  static set(key: string, item: any) {
    // TODO customize prefix
    localStorage.setItem('app_' + key, item);
  }

  static get(key: string): string {
    return localStorage.getItem('app_' + key);
  }
}
