import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from './core/auth/auth.service';
import {Message} from 'primeng/primeng';
import {MessagesService} from './core/messages.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {

  private subscription: any;
  life = 10000;
  messages: Message[] = [];

  constructor(private authService: AuthService, private messagesService: MessagesService, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.authService.init();
    this.subscription = this.messagesService.showMessage$.subscribe(messageConfig => this.showMessage(messageConfig));
  }

  private showMessage(config: object) {
    this.life = config['life'];
    this.messages.push(config);
    // it needed for some cases, for example adding new social in a profile
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
