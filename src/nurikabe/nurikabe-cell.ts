import { bindable, bindingMode, computedFrom } from 'aurelia-framework';

import { Cell } from './nurikabe';


export class NurikabeCell {
  @bindable
  cell: Cell;

  @computedFrom("cell.value")
  get cellColor() {
    if (this.cell.value === Cell.BLACK) {
      return "#000";
    }
    if (this.cell.value === Cell.EMPTY) {
      return "#888";
    }
    if (this.cell.value === Cell.UNREACHABLE) {
      return "#444";
    }
    return "#fff";
  }

  @computedFrom("cell.value")
  get displayedValue() {
    return this.cell.numberCell ? this.cell.value : "";
  }

  toggle() {
    this.cell.toggle();
  }

  click(event: MouseEvent) {
    if (event.which === 1) {
      // left click
      this.toggle();
    }
    if (event.which === 3) {
      // right click
      this.toggle();
      this.toggle();
    }
  }

}

