import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dynamic-task]',
})
export class DynamicTask {
  constructor(public viewContainerRef: ViewContainerRef) { }
}

