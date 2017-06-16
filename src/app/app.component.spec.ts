import {TestBed, async} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {AppComponent} from './app.component';
import {HttpModule} from '@angular/http';
import {HeaderComponent} from './header/header.component';
import {GrowlModule, MenubarModule} from 'primeng/primeng';
import {AuthService} from './core/auth/auth.service';
import {MessagesService} from './core/messages.service';
import {Config} from './core/config.service';
import {Api} from './core/api.service';
import {AppConfig} from '../main';
import {LocalStorage} from './core/local-storage.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent
      ],
      providers: [
        AuthService,
        MessagesService,
        {provide: Config, useFactory: () => AppConfig.config},
        Api,
        LocalStorage
      ],
      imports: [
        RouterTestingModule,
        HttpModule,
        MenubarModule,
        GrowlModule
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  
});
