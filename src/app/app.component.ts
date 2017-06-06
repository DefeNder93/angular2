import {Component, OnDestroy, OnInit} from '@angular/core';
import {Auth} from './common/auth/auth.service';
import {LocalStorage} from './common/local-storage.service';
import {Api} from './common/api.service';
import {Message} from 'primeng/primeng';
import {Messages} from './common/messages.service';
import {Config} from './common/config.service';
import {AppConfig} from '../main';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [Api, Auth, LocalStorage, Messages, LocalStorage, {provide: Config, useFactory: () => AppConfig.config}]
})
export class AppComponent implements OnDestroy, OnInit {

  private subscription: any;
  life = 10000;
  messages: Message[] = [];

  constructor(private _auth: Auth, private _messages: Messages) {}

  ngOnInit() {
    this._auth.init();
    this.messages = [];
    this.subscription = this._messages.showMessage$.subscribe(messageConfig => this.showMessage(messageConfig));
  }

  private showMessage(config: object) {
    this.life = config['life'];
    this.messages.push(config);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
