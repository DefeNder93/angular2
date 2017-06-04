import {Component, OnDestroy, OnInit} from '@angular/core';
import {Auth} from './common/auth/Auth.service';
import {LocalStorage} from './common/LocalStorage.service';
import {Api} from './common/Api.service';
import {Message} from 'primeng/primeng';
import {Messages} from './common/Messages.service';
import {Config} from './common/Config.service';
import {AppConfig} from '../main';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [Api, Auth, LocalStorage, Messages, LocalStorage, {provide: Config, useFactory: () => {console.log('useFactory'); return AppConfig.config}}]
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
