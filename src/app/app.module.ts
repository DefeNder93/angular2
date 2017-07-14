import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, Http, XHRBackend, RequestOptions} from '@angular/http';

import {AppRoutingModule} from './routing.module';
import {MenubarModule} from 'primeng/primeng';
import {httpFactory} from './override/http-factory';
import {HeaderComponent} from './header/header.component';
import {LoginComponent} from './login/login.component';
import {TaskModule} from './tasks/task/task.module';
import {ButtonModule} from 'primeng/primeng';
import {GrowlModule} from 'primeng/primeng';
import {ProfileComponent} from './profile/profile.component';
import {InputTextModule} from 'primeng/primeng';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {TasksComponent} from './tasks/tasks.component';

@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    HeaderComponent,
    ProfileComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MenubarModule,
    ButtonModule,
    GrowlModule,
    InputTextModule,

    AppRoutingModule,
    TaskModule,
    CoreModule
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
export class AppModule {
}
