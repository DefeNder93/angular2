import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/primeng";
import {Messages} from "../common/Messages.service";

@Component({
  selector: 'app-header',
  template: '<p-menubar [model]="items"></p-menubar>',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private _messages: Messages) { }

  private items: MenuItem[];

  ngOnInit() {

    // test of messages
    // setTimeout(() => {
    //   this._messages.showInfo('test', 'Test title', 1000);
    // }, 1000);

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
