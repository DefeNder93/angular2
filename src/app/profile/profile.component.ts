import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Auth} from "../common/auth/Auth.service";
import {Messages} from "../common/Messages.service";

@Component({
  selector: 'app-profile',
  template: `
    <div class="profile-form">
      <h3>First Name:</h3>
      <input type="text" size="30" pInputText [(ngModel)]="firstName" />

      <h3>Last Name:</h3>
      <input type="text" size="30" pInputText [(ngModel)]="lastName" />

      <p><button (click)="save()" type="button" pButton label="Save"></button></p>

      <h3>Related Social Networks:</h3>
      <p>
        <i (click)="addSocial('facebook')" class="fa fa-facebook-square"></i>
        <i (click)="addSocial('github')" class="fa fa-github"></i>
        <i (click)="addSocial('google')" class="fa fa-google-plus"></i>
      </p>
    </div>
  `,
  styleUrls: ['profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private _auth: Auth, private _messages: Messages, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
  }

  firstName: string;
  lastName: string;

  save = () => {
    console.log('save');
    console.log('firstName ' + this.firstName);
    console.log('lastName ' + this.lastName);
  };

  addSocial = (provider: string) => {
    this._auth.addSocial(provider).then(r => {
      this._messages.showSuccess('Social network ' + provider + ' was successfully added', 'Social was added', 5000);
    });
  };

}
