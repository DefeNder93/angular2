import {NgModule} from '@angular/core';
import {MessagesService} from './messages.service';
import {LocalStorage} from './local-storage.service';
import {Api} from './api.service';
import {AuthService} from './auth/auth.service';
import {Config} from './config.service';
import {AppConfig} from '../../main';

@NgModule({
  providers: [
    {provide: Config, useFactory: () => AppConfig.config},
    MessagesService,
    LocalStorage,
    Api,
    AuthService
  ]
})
export class SharedModule {
}
