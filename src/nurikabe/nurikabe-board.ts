import { bindable, inject, BindingEngine } from 'aurelia-framework';

import { Nurikabe } from './nurikabe';

@inject(BindingEngine)
export class NurikabeBoard {

  nurikabe: Nurikabe = new Nurikabe();

  boardString: string = "##5  ###1#6#  #1### ##### ## #3#   ## # ### ## # #1# ## ##### ###1#  #8#1#### 4##";
  error?: string;

  constructor(bindingEngine: BindingEngine) {
    this.parse();
  }

  parse() {
    try {
      this.nurikabe.parse(this.boardString);
      this.error = undefined;
    }
    catch (e) {
      this.error = e;
    }
  }

}

