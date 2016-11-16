import { bindable } from 'aurelia-framework';

export class Focustest {
  @bindable value: string;
  hasFocus: boolean;

  click() {
    this.value = "";
    this.hasFocus = true;
  }

}

