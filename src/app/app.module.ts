import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule, Http, XHRBackend, RequestOptions} from '@angular/http';

import {AppRoutingModule} from './routing.module';
import {TestComponent} from './test/test.component';
import {MenubarModule} from 'primeng/primeng';
import {httpFactory} from './override/httpFactory';
import {HeaderComponent} from './header/header.component';
import {LoginComponent} from './login/login.component';
import {TaskModule} from './tasks/task/task.module';
import {ButtonModule} from 'primeng/primeng';
import {GrowlModule} from 'primeng/primeng';
import {ProfileComponent} from './profile/profile.component';
import {InputTextModule} from 'primeng/primeng';
import {AppConfig} from 'main';
import {Config} from './common/Config.service';
import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    TestComponent,
    HeaderComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    TaskModule,
    MenubarModule,
    ButtonModule,
    GrowlModule,
    InputTextModule
  ],
  providers: [
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions]
    },
    {provide: Config, useFactory: () => AppConfig.config}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
