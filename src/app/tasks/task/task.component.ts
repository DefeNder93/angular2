import { Component, OnInit, ComponentFactoryResolver, ViewChild, AfterViewInit } from '@angular/core';
import {CombineTask} from "./types/combineTask/CombineTask";
import {DynamicTask} from "./dynamicTask.directive";
import {InsertTask} from "./types/insertTask/InsertTask";
// TODO https://angular.io/docs/ts/latest/cookbook/dynamic-component-loader.html

@Component({
  selector: 'app-task',
  template: `<p>task works!</p>
  <ng-template dynamic-task></ng-template>
  `,
  styleUrls: ['task.component.scss']
})
export class TaskComponent implements OnInit, AfterViewInit {

  @ViewChild(DynamicTask) dynamicTask: DynamicTask;
  constructor(private _componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.loadComponent();
  }


  loadComponent() {
    let componentFactory = this._componentFactoryResolver.resolveComponentFactory(InsertTask);
    //let componentFactory = this._componentFactoryResolver.resolveComponentFactory(CombineTask);
    let viewContainerRef = this.dynamicTask.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createComponent(componentFactory);
  }

}
