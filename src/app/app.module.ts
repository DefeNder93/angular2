import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule, Http, XHRBackend, RequestOptions} from '@angular/http';

import { AppComponent } from "./app.component";
import {AppRoutingModule} from "./routing.module";
import {TestComponent} from "./test/test.component";
import {PasswordModule} from 'primeng/primeng';
import {httpFactory} from "./override/httpFactory";
import {HeaderComponent} from "./header/header.component";
import {LoginComponent} from "./login/login.component";
import {TaskModule} from "./tasks/task/task.module";

@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    TestComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    PasswordModule,
    TaskModule
  ],
  providers: [
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
