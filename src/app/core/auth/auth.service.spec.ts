import {AuthService} from './auth.service';
import {Config} from '../config.service';
import {Api} from '../api.service';
import {MessagesService} from '../messages.service';
import {LocalStorage} from '../local-storage.service';
import {TestHelper} from '../../../helpers/test-helper.class';
import {User} from './user.model';
import {TestAppHelper} from '../../../helpers/test-app-helper.class';

describe('AuthService', () => {
  let service: AuthService;
  const config: Config = new Config(),
  api = TestAppHelper.getApiMock(),
  messagesService = new MessagesService,
  localStorage = TestAppHelper.getLocalStorageMock();

  beforeEach(() => {
    service = new AuthService(config, api as Api, messagesService as MessagesService, localStorage as LocalStorage);
  });

  it('should get user from server (imitation)', (done: any) => {
    const user: User = new User();
    user.firstName = 'from server';
    TestHelper.spyOnPromise(api, 'getUser', {json: () => user});
    service.getUser().then(currentUser => {
      expect(currentUser).toBe(user);
      done();
    });
  });

  it('should get user from memory', (done: any) => {
    const memoryUser: User = new User();
    memoryUser.firstName = 'memory user';
    const serverUser: User = new User();
    serverUser.firstName = 'server user';
    TestHelper.spyOnPromiseMultiple(api, 'getUser', [{json: () => memoryUser}, {json: () => serverUser}]);
    service.getUser().then(r => // set first user to memory
      service.getUser().then(r2 => { // should get user from memory, not from server
        expect(r2).toBe(memoryUser);
        done();
      }));
  });

  it('should save user', (done: any) => {
    const user = new User();
    user.firstName = 'user for save';
    TestHelper.spyOnPromise(api, 'updateUser', user);
    service.saveUser(user).then(r => {
      expect(r).toBe(user);
      done();
    });
  });

  it('should check if user logged in', () => {
    TestHelper.spyOnMultiple(localStorage, 'get', ['not null', null]);
    expect(service.isLoggedIn()).toBeTruthy();
    expect(localStorage.get).toHaveBeenCalledWith('auth');
    expect(service.isLoggedIn()).toBeFalsy();
  });

  it('should logout', () => {
    spyOn(localStorage, 'set');
    service.logout();
    expect(localStorage.set).toHaveBeenCalledWith('auth', null);
  });

  it('should get current provider name (null)', () => {
    TestHelper.spyOn(localStorage, 'get', null);
    expect(service.getCurrentProviderName()).toBeNull();
    expect(localStorage.get).toHaveBeenCalledWith('auth');
  });

  it('should get current provider name (not null)', () => {
    TestHelper.spyOn(localStorage, 'get', {provider: 'facebook1'});
    expect(service.getCurrentProviderName()).toBe('facebook1');
  });

  // TODO complete unit tests
});
