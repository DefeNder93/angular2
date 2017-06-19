
export class TestHelper {
  static spyOnPromise = (service, methodName: string, resolveObj) => spyOn(service, methodName)
    .and.returnValue(Promise.resolve(resolveObj));

  static spyOnPromiseMultiple = (service, methodName: string, thisArg, resolveArray) => spyOn(service, methodName)
    .and.returnValues.apply(thisArg, TestHelper.wrapToPromise(resolveArray));

  static spyOnMultiple = (service, methodName: string, thisArg, resolveArray) => spyOn(service, methodName)
    .and.returnValues.apply(thisArg, resolveArray);

  private static wrapToPromise = (resolveArray) => resolveArray.map(el => Promise.resolve(el));
}
