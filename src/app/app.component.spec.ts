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
    expect(comp.life).toBeDefined();
    expect(comp.messages).toEqual([]);
  }));

  it('should init app module (messages and auth service)', async(() => {
    const messagesService = fixture.debugElement.injector.get(MessagesService);
    const authService = fixture.debugElement.injector.get(AuthService);
    const subscribeSpy = spyOn(messagesService.showMessage$, 'subscribe');
    spyOn(authService, 'init');
    fixture.detectChanges();
    expect(authService.init).toHaveBeenCalled();
    expect(messagesService.showMessage$.subscribe).toHaveBeenCalled();
    expect(subscribeSpy.calls.mostRecent().args.length).toBe(1);

    spyOn(comp, 'showMessage');
    subscribeSpy.calls.mostRecent().args[0]({life: 42});
    expect(comp.showMessage).toHaveBeenCalledWith({life: 42});
  }));

  it('should show message', async(() => {
    // TODO test showMessage
    // comp.showMessage
  }));

  // TODO test template

  it('should remove subscription', async(() => {
    comp.subscription = {unsubscribe: () => {}};
    spyOn(comp.subscription, 'unsubscribe');
    comp.ngOnDestroy();
    expect(comp.subscription.unsubscribe).toHaveBeenCalled();
  }));
});
