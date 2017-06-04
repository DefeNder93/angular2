import {IUser} from '../common/auth/IUser';
import {AuthInfo} from '../common/auth/AuthInfo';

export class User implements IUser {
  name: string;
  email: string;
  authInfo: AuthInfo;
}
