import {ComponentFixture} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

interface CompomentToTest {
  subscription: any;
  ngOnDestroy: () => {};
}

export class TestComponentHelper<T extends CompomentToTest> {
  comp: T;
  constructor(private fixture?: ComponentFixture<T>) {
    this.comp = fixture.componentInstance
  }

  existsByCss = (css) => expect(this.fixture.debugElement.query(By.css(css))).toBeDefined();

  destroyUnsubscribe = () => {
    this.comp.subscription = {unsubscribe: () => {}};
    spyOn(this.comp.subscription, 'unsubscribe');
    this.comp.ngOnDestroy();
    expect(this.comp.subscription.unsubscribe).toHaveBeenCalled();
  };
}
