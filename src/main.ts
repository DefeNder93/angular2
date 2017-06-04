import {enableProdMode, ReflectiveInjector} from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {Config} from "./app/common/Config.service";

import {Http} from "@angular/http";
import {HTTP_PROVIDERS} from "./http-providers-independent";

if (environment.production) {
  enableProdMode();
}

export class AppConfig {
  static config: object;
}

function deferredBootstrap() {
  let config: Config = new Config();
  const injector = ReflectiveInjector.resolveAndCreate([HTTP_PROVIDERS]);
  const http = injector.get(Http);

  http.get('assets/config.json')
    .toPromise()
    .then(r => {
      config.init(r.json());
      window['ng_app_config'] = config;
      AppConfig.config = config;
      platformBrowserDynamic().bootstrapModule(AppModule);
    }).catch(r => {
      console.log('Bootstrap error');
      console.log(r);
    });
}
deferredBootstrap();
