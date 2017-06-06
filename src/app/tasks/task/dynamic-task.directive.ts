import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appDynamicTask]',
})
export class DynamicTaskDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}

