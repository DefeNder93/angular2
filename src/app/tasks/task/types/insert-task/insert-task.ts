import { Component, OnInit } from '@angular/core';
import {ITask} from '../task.interface';

@Component({
  selector: 'app-insert-task',
  template: '<p>insert task works!</p>',
  styleUrls: ['insert-task.component.scss']
})
export class InsertTaskComponent implements OnInit, ITask {
  id: string;
  name: string;

  constructor() { }

  ngOnInit() {
    this.id = 'tasks.Insert';
    this.name = 'Insert';
  }

}
