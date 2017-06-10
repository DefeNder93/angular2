import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from './common/auth/auth.service';
import {LocalStorage} from './common/local-storage.service';
import {Api} from './common/api.service';
import {Message} from 'primeng/primeng';
import {MessagesService} from './common/messages.service';
import {Config} from './common/config.service';
import {AppConfig} from '../main';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [Api, AuthService, LocalStorage, MessagesService, LocalStorage, {provide: Config, useFactory: () => AppConfig.config}]
})
export class AppComponent implements OnDestroy, OnInit {

  private subscription: any;
  life = 10000;
  messages: Message[] = [];

  constructor(private authService: AuthService, private messagesService: MessagesService) {}

  ngOnInit() {
    this.authService.init();
    this.messages = [];
    this.subscription = this.messagesService.showMessage$.subscribe(messageConfig => this.showMessage(messageConfig));
  }

  private showMessage(config: object) {
    this.life = config['life'];
    this.messages.push(config);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
