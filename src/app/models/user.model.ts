import {IUser} from '../common/auth/user.interface';
import {Socials} from './socials.model';

export class User {
  email: string;
  firstName: string;
  lastName: string;
  socials: Socials;

  constructor() {
    this.socials = new Socials();
  }
}
