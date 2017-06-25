import {User} from '../app/core/auth/user.model';
export class TestAppHelper {
  static getLocalStorageMock = () => {
    return {get: (key: string) => { return null }, set: (key: string, item: any) => { return null }}
  };
  static  getApiMock = () => {
    return { getUser: () => {}, updateUser: (user: User) => {}}
  }
}
