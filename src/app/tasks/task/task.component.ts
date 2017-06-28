import {Component, ComponentFactoryResolver, ViewChild, AfterContentInit} from '@angular/core';
import {DynamicTaskDirective} from './dynamic-task.directive';
import {InsertTaskComponent} from './types/insert-task/insert-task';
import {CombineTaskComponent} from './types/combine-task/combine-task';

@Component({
  selector: 'app-task',
  template: `<p>task works!</p>
  <ng-template appDynamicTask></ng-template>`,
  styleUrls: ['task.component.scss']
})
export class TaskComponent implements AfterContentInit{

  // doc https://angular.io/docs/ts/latest/cookbook/dynamic-component-loader.html
  @ViewChild(DynamicTaskDirective) dynamicTask: DynamicTaskDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngAfterContentInit() {
    this.loadComponent();
  }

  loadComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(CombineTaskComponent);
    // let componentFactory = this._componentFactoryResolver.resolveComponentFactory(CombineTask);
    const viewContainerRef = this.dynamicTask.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createComponent(componentFactory);
  }

}
