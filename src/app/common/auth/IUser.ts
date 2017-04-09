import {AuthInfo} from "./AuthInfo";
export interface IUser {
  name: string;
  email: string;
  authInfo: AuthInfo;
}
