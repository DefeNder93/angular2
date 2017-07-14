import {enableProdMode, ReflectiveInjector} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {Http} from '@angular/http';
import {HTTP_PROVIDERS} from './http-providers-independent';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {Config} from './app/core/config.service';
import {Logger} from './app/core/logger';

if (environment.production) {
  enableProdMode();
}

const deferredBootstrap = () => initConfig().toPromise().then(() => platformBrowserDynamic().bootstrapModule(AppModule));

function initConfig() {
  const config: Config = new Config();
  const injector = ReflectiveInjector.resolveAndCreate([HTTP_PROVIDERS]);
  const http = injector.get(Http);
  const observable = http.get('assets/config.json')
    .map(r => r.json())
    .catch(r => Logger.error('Bootstrap error', r));
  observable.subscribe(d => {
    config.init(d);
    AppConfig.config = config;
  });
  return observable;
}
deferredBootstrap();

export class AppConfig {
  static config: Config;
}
