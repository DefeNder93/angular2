export class LocalStorage {

  static set(key: string, item: any) {
    // TODO customize prefix
    localStorage.setItem('app_' + key, this.getItemAsString(item));
  }

  static getItemAsString(item: any) {
    if (item !== null && typeof item === 'object') {
      return JSON.stringify(item);
    }
    return item;
  }

  static getItemFromString(str: string) {
    if (this.isJsonString(str)) {
      return JSON.parse(str);
    }
    return str;
  }

  static isJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
  return true;
}

  static get(key: string): any {
    return this.getItemFromString(localStorage.getItem('app_' + key));
  }
}
