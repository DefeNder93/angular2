import { Component, OnInit, ComponentFactoryResolver, ViewChild, AfterViewInit } from '@angular/core';
import {CombineTaskComponent} from './types/combineTask/CombineTask';
import {DynamicTaskDirective} from './dynamicTask.directive';
import {InsertTaskComponent} from './types/insertTask/InsertTask';

@Component({
  selector: 'app-task',
  template: `<p>task works!</p>
  <ng-template appDynamicTask></ng-template>
  `,
  styleUrls: ['task.component.scss']
})
export class TaskComponent implements OnInit, AfterViewInit {

  // docs https://angular.io/docs/ts/latest/cookbook/dynamic-component-loader.html
  @ViewChild(DynamicTaskDirective) dynamicTask: DynamicTaskDirective;
  constructor(private _componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {}

  ngAfterViewInit = () => this.loadComponent();

  loadComponent() {
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(InsertTaskComponent);
    // let componentFactory = this._componentFactoryResolver.resolveComponentFactory(CombineTask);
    const viewContainerRef = this.dynamicTask.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createComponent(componentFactory);
  }

}
