import { Component, OnInit } from '@angular/core';
// TODO https://angular.io/docs/ts/latest/cookbook/dynamic-component-loader.html

@Component({
  selector: 'app-task',
  template: `<p>task works!</p>
  <combine-task></combine-task>
  `,
  styleUrls: ['task.component.scss']
})
export class TaskComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
