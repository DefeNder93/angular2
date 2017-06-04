import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Auth} from '../common/auth/Auth.service';
import {Messages} from '../common/Messages.service';

@Component({
  selector: 'app-profile',
  template: `
    <div class="profile-form">
      <h3>Email:</h3>
      <input type="text" size="30" pInputText [(ngModel)]="user.email" />
      
      <h3>First Name:</h3>
      <input type="text" size="30" pInputText [(ngModel)]="user.firstName" />

      <h3>Last Name:</h3>
      <input type="text" size="30" pInputText [(ngModel)]="user.lastName" />

      <p><button (click)="save()" type="button" pButton label="Save"></button></p>

      <h3>Related Social Networks:</h3>
      
      <p class="related-socials">
        <i (click)="addSocial('facebook')" [class.active]="user.socials.facebook" class="fa fa-facebook-square"></i>
        <i (click)="addSocial('github')" [class.active]="user.socials.github" class="fa fa-github"></i>
        <i (click)="addSocial('google')" [class.active]="user.socials.google" class="fa fa-google-plus"></i>
      </p>
    </div>
  `,
  styleUrls: ['profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: object = {email: '', firstName: '', lastName: '', socials: {facebook: null, google: null, github: null}};

  constructor(private _auth: Auth, private _messages: Messages, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit = () => {
    this._auth.getUser().then(u => this.user = u);
  };

  save = () => this._auth.saveUser(this.user)
    .then(r => this._messages.showSuccess('User was successfully added', 'Social was added'))
      .catch(r => this._messages.showServerError('User was not added'));

  addSocial = (provider: string) => this._auth.addSocial(provider).then(r => this.addSocialSuccess(provider));

  private addSocialSuccess(provider) {
    this._messages.showSuccess('Social network ' + provider + ' was successfully added', 'Social was added', 5000);
    this.user['socials'][provider] = true;
  }

}
