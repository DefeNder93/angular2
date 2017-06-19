import {AuthService} from './auth.service';
import {Config} from '../config.service';
import {Api} from '../api.service';
import {MessagesService} from '../messages.service';
import {LocalStorage} from '../local-storage.service';
import {TestHelper} from '../../../helpers/test-helper.class';
import {User} from './user.model';

describe('AuthService', () => {
  let service: AuthService;
  const config: Config = new Config(),
  api = {getUser: () => {}, updateUser: (user: User) => {}},
  messagesService = new MessagesService,
  localStorage = {get: (key: string) => { return null }};

  beforeEach(() => {
    service = new AuthService(config, api as Api, messagesService as MessagesService, localStorage as LocalStorage);
  });

  it('should get user from server (imitation)', () => {
    const user: User = new User();
    user.firstName = 'from server';
    TestHelper.spyOnPromise(api, 'getUser', {json: () => user});
    service.getUser().then(currentUser => {
      expect(currentUser).toBe(user);
    });
  });

  it('should get user from memory', () => {
    const memoryUser: User = new User();
    memoryUser.firstName = 'memory user';
    const serverUser: User = new User();
    serverUser.firstName = 'server user';
    // TestHelper.spyOnPromiseMultiple(api, 'getUser', this, [{json: () => memoryUser}, {json: () => serverUser}]);
    spyOn(service, 'getUser')
      .and.returnValues(Promise.resolve({json: () => memoryUser}), Promise.resolve({json: () => serverUser}));
    service.getUser().then(r => // set first user to memory
      service.getUser().then(currentUser => { // should get user from memory, not from server
        expect(currentUser).toBe(memoryUser);
      }));
  });

  it('should save user', () => {
    const user = new User();
    user.firstName = 'user for save';
    TestHelper.spyOnPromise(api, 'updateUser', user);
    service.saveUser(user).then(r => expect(r).toBe(user));
  });

  it('should check if user logged in', () => {
    const spy = TestHelper.spyOnMultiple(localStorage, 'get', this, ['not null', null]);
    expect(service.isLoggedIn()).toBeTruthy();
    expect(spy.calls.mostRecent().args.length).toBe(1);
    expect(spy.calls.mostRecent().args[0]).toBe('auth');
    expect(service.isLoggedIn()).toBeFalsy();
  });
});
