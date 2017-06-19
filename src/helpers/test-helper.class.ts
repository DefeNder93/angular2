export class TestHelper {
  static spyOn = (service, methodName: string, resolveObj) => spyOn(service, methodName)
    .and.returnValue(resolveObj);

  static spyOnPromise = (service, methodName: string, resolveObj) => spyOn(service, methodName)
    .and.returnValue(Promise.resolve(resolveObj));

  static spyOnMultiple = (service, methodName: string, resolveArray) => spyOn(service, methodName)
    .and.returnValues.apply(null, resolveArray);

  static spyOnPromiseMultiple = (service, methodName: string, resolveArray) => spyOn(service, methodName)
    .and.returnValues.apply(null, TestHelper.wrapToPromise(resolveArray));

  private static wrapToPromise = (resolveArray) => resolveArray.map(el => Promise.resolve(el));
}
