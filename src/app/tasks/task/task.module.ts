import { NgModule } from '@angular/core';
import {TaskComponent} from './task.component';
import {CombineTaskComponent} from './types/combineTask/CombineTask';
import {InsertTaskComponent} from './types/insertTask/InsertTask';
import {DynamicTaskDirective} from './dynamicTask.directive';
import {PasswordModule} from 'primeng/primeng';

@NgModule({
  declarations: [
    TaskComponent,
    CombineTaskComponent,
    InsertTaskComponent,
    DynamicTaskDirective
  ],
  imports: [
    PasswordModule
  ],
  entryComponents: [ CombineTaskComponent, InsertTaskComponent ],
})
export class TaskModule { }
