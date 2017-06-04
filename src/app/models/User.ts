import {IUser} from '../common/auth/IUser';
import {Socials} from './Socials';

export class User implements IUser {
  email: string;
  firstName: string;
  lastName: string;
  socials: Socials;

  constructor() {
    this.socials = new Socials();
  }
}
