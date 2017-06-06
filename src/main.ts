import {enableProdMode, ReflectiveInjector} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {Http} from '@angular/http';
import {HTTP_PROVIDERS} from './http-providers-independent';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {Config} from './app/common/config.service';
import {Logger} from './app/common/logger';

if (environment.production) {
  enableProdMode();
}

function deferredBootstrap() {
  initConfig().then(function(){
    platformBrowserDynamic().bootstrapModule(AppModule);
  });
}
function initConfig() {
  const config: Config = new Config();
  const injector = ReflectiveInjector.resolveAndCreate([HTTP_PROVIDERS]);
  const http = injector.get(Http);
  return http.get('assets/config.json')
    .toPromise()
    .then(r => {
      config.init(r.json());
      AppConfig.config = config;
      // throw new Error('123');
    }).catch(r => Logger.error('Bootstrap error', r));
}
deferredBootstrap();

export class AppConfig {
  static config: Config;
}
