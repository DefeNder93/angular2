import { Component, OnInit } from '@angular/core';
import {ITask} from '../task.interface';

@Component({
  selector: 'app-combine-task',
  template: '<p>combine task works!</p>',
  styleUrls: ['combine-task.component.scss']
})
export class CombineTaskComponent implements OnInit, ITask {
  id: string;
  name: string;

  constructor() { }

  ngOnInit() {
    this.id = 'tasks.Combine';
    this.name = 'Combine';
  }

}
