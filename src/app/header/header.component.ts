import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/primeng";

@Component({
  selector: 'app-header',
  template: '<p-menubar [model]="items"></p-menubar>',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  private items: MenuItem[];

  ngOnInit() {

    this.items = [
      {
        label: 'Login',
        routerLink: ['/login']
      },
      {
        label: 'Task',
        routerLink: ['/task/1']
      }
    ];

  }

}
