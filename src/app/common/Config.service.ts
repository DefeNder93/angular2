export class Config {
  private _config: Object;

  get = (key?: string): string => this._config[key];
  init = (config: object) => this._config = config;
}
