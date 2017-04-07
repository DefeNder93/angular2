import { Component } from '@angular/core';
import {Http} from "@angular/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(private http: Http) {
    console.log('it works');
  }

  ngOnInit() {
    this.http.get('/users')
      .subscribe(test => {
        console.log('test');
        console.log(test);
      });
  }
  title = 'app works!';
}
