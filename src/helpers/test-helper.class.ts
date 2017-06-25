import {Observable} from 'rxjs/Rx';
export class TestHelper {
  static spyOn = (service, methodName: string, resolveObj) => spyOn(service, methodName)
    .and.returnValue(resolveObj);

  static spyOnPromise = (service, methodName: string, resolveObj) => spyOn(service, methodName)
    .and.returnValue(Promise.resolve(resolveObj));

  static spyOnMultiple = (service, methodName: string, resolveArray) => spyOn(service, methodName)
    .and.returnValues.apply(null, resolveArray);

  static spyOnPromiseMultiple = (service, methodName: string, resolveArray) => spyOn(service, methodName)
    .and.returnValues.apply(null, TestHelper.wrapToPromise(resolveArray));

  static spyOnSubscribe = (service, methodName: string, resolveObj) => spyOn(service, methodName)
    .and.returnValue(Observable.of(resolveObj));

  static spyOnSubscribeMultile = (service, methodName: string, resolveArray) => spyOn(service, methodName)
    .and.returnValues.apply(null, TestHelper.wrapToSubscribe(resolveArray));

  private static wrapToPromise = (resolveArray) => resolveArray.map(el => Promise.resolve(el));

  private static wrapToSubscribe = (resolveArray) => resolveArray.map(el => Observable.of(el));
}
