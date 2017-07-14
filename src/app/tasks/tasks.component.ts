import {Component, OnInit} from '@angular/core';
import {Api} from '../core/api.service';
import {Task} from '../models/task.model';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['tasks.component.scss']
})
export class TasksComponent implements OnInit {

  tasks: Array<Task>;
  constructor(private api: Api) {

  }

  ngOnInit() {
    this.api.getTasks().subscribe(r => this.tasks = r);
  };

}
