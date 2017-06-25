import {Component, OnInit} from '@angular/core';
import {AuthService} from '../core/auth/auth.service';
import {MessagesService} from '../core/messages.service';
import {User} from '../core/auth/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User = new User();

  constructor(private authService: AuthService, private messagesService: MessagesService) {
  }

  ngOnInit() {
    this.authService.getUser().subscribe(u => this.user = u);
  };

  save = () => this.authService.saveUser(this.user)
    .subscribe(r => this.messagesService.showSuccess('User was successfully added', 'Social was added'),
      e => this.messagesService.showServerError('User was not added'));

  addSocial = (provider: string) => this.authService.addSocial(provider).then(r => this.addSocialSuccess(provider));

  private addSocialSuccess(provider) {
    this.messagesService.showSuccess('Social network ' + provider + ' was successfully added', 'Social was added', 5000);
    this.user['socials'][provider] = true;
  }

}
