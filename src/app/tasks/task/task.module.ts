import { NgModule } from '@angular/core';
import {TaskComponent} from "./task.component";
import {CombineTask} from "./types/combineTask/CombineTask";
import {InsertTask} from "./types/insertTask/InsertTask";
import {DynamicTask} from "./dynamicTask.directive";
import {PasswordModule} from "primeng/primeng";

@NgModule({
  declarations: [
    TaskComponent,
    CombineTask,
    InsertTask,
    DynamicTask
  ],
  imports: [
    PasswordModule
  ],
  entryComponents: [ CombineTask, InsertTask ],
})
export class TaskModule { }
