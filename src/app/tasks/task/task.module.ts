import {NgModule} from '@angular/core';
import {TaskComponent} from './task.component';
import {CombineTaskComponent} from './types/combine-task/combine-task.component';
import {InsertTaskComponent} from './types/insert-task/insert-task';
import {DynamicTaskDirective} from './dynamic-task.directive';
import {PasswordModule} from 'primeng/primeng';
import {DragDropModule} from 'primeng/primeng';
import {CommonModule} from '@angular/common';
import {CombineTaskService} from './types/combine-task/combine-task.service';

@NgModule({
  declarations: [
    TaskComponent,
    CombineTaskComponent,
    InsertTaskComponent,
    DynamicTaskDirective
  ],
  providers: [
    CombineTaskService
  ],
  imports: [
    PasswordModule,
    DragDropModule,
    CommonModule
  ],
  entryComponents: [CombineTaskComponent, InsertTaskComponent],
})
export class TaskModule {
}
