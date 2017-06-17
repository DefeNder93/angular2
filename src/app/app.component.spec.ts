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
  let fixture, comp, call;
  beforeEach(async(() => {
    call = {};
    const authServiceMock = {
      init: () => {call['authInit'] = true}
    };
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent
      ],
      providers: [
        MessagesService,
        {provide: AuthService, useValue: authServiceMock},
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

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
  });

  it('should create the app', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should init app module (messages and auth service)', async(() => {
    fixture.detectChanges();
    expect(comp.messages).toEqual([]);
    expect(call['authInit']).toBeTruthy();
  }));
});
