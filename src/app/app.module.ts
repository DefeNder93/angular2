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
import {TaskComponent} from "./tasks/task/task.component";
import {CombineTask} from "./tasks/task/types/combineTask/CombineTask";
import {DynamicTask} from "./tasks/task/dynamicTask.directive";
import {InsertTask} from "./tasks/task/types/insertTask/InsertTask";

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    HeaderComponent,
    TaskComponent,
    CombineTask,
    InsertTask,
    DynamicTask
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    PasswordModule
  ],
  entryComponents: [ CombineTask, InsertTask ],
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
