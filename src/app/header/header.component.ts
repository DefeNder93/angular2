import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/primeng';
import {MessagesService} from '../shared/messages.service';

@Component({
  selector: 'app-header',
  template: '<p-menubar [model]="items"></p-menubar>',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit {

  private items: MenuItem[];

  constructor() {
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Login',
        routerLink: ['/login']
      },
      {
        label: 'Task',
        routerLink: ['/task/1']
      },
      {
        label: 'Profile',
        routerLink: ['/profile']
      }
    ];
  }

}
