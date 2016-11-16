import { computedFrom, Aurelia, bindable } from 'aurelia-framework';


export class Test1 {
  @bindable message = 'Hello World!';

  zz = {
    a: 123,
    b: "foo"
  }

  constructor() {
    this.test();
  }

  test() {
    console.log(this.zz);
    console.log(JSON.stringify(this.zz));
  }

  @computedFrom("zz.a", "zz.b")
  get bla() {
    return `${this.zz.a} ${this.zz.b}`;
  }
}
