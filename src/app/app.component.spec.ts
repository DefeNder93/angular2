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
import {TestComponentHelper} from '../helpers/test-component-helper.class';

describe('AppComponent', () => {
  let fixture, comp, testHelper;

  beforeEach(async(() => {
    const authServiceMock = {
      init: () => {}
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
    testHelper = new TestComponentHelper(fixture);
    comp = fixture.componentInstance;
  });

  it('should create the app', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
    expect(comp.life).toBeDefined();
    expect(comp.messages).toEqual([]);
  }));

  it('should init app module (messages and auth service)', () => {
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
  });

  it('should show message', () => {
    const config = {life: 41};
    comp.showMessage(config);
    expect(comp.life).toBe(41);
    expect(comp.messages).toEqual([{life: 41}]);
  });

  it('should remove subscription', () => {
    testHelper.destroyUnsubscribe();
  });

  it('template should have messages, header and router outlet', () => {
    testHelper.existsByCss('app-header');
    testHelper.existsByCss('router-outlet');
    testHelper.existsByCss('p-growl');
  })
});
