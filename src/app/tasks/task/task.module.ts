import { NgModule } from '@angular/core';
import {TaskComponent} from './task.component';
import {CombineTaskComponent} from './types/combineTask/combine-task';
import {InsertTaskComponent} from './types/insertTask/insert-task';
import {DynamicTaskDirective} from './dynamic-task.directive';
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
