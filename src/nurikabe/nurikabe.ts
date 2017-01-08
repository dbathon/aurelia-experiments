
export class Cell {
  static readonly EMPTY = " ";
  static readonly BLACK = "B";
  static readonly UNREACHABLE = "U";
  static readonly WHITE = "W";

  static readonly NUMBER_PATTERN = /^[1-9]$/;

  constructor(public readonly owner: Nurikabe,
    public readonly x: number, public readonly y: number,
    public value: string, public readonly solution: string | null = null) { }

  static parse(owner: Nurikabe, x: number, y: number, cellString: string): Cell {
    if (Cell.NUMBER_PATTERN.test(cellString)) {
      return new Cell(owner, x, y, cellString, cellString);
    }
    let solution: string | null = null;
    if ("#" === cellString) {
      solution = Cell.BLACK;
    }
    else if (" " === cellString) {
      solution = Cell.WHITE;
    }
    return new Cell(owner, x, y, Cell.EMPTY, solution);
  }

  toggle() {
    let newValue: string = this.value;
    if (this.value === Cell.BLACK) {
      newValue = Cell.EMPTY;
    }
    else if (this.value === Cell.EMPTY) {
      newValue = Cell.WHITE;
    }
    else if (this.value === Cell.WHITE || this.value === Cell.UNREACHABLE) {
      newValue = Cell.BLACK;
    }
    if (newValue) {
      this.value = newValue;
      this.owner.cellValueChanged(this);
    }
  }

  get correct(): boolean {
    return !!(this.solution && this.solution === this.value);
  }

  get numberCell(): boolean {
    return Cell.NUMBER_PATTERN.test(this.value);
  }

  get neighbors(): Array<Cell> {
    return [[-1, 0], [1, 0], [0, -1], [0, 1]]
      .map(offsets => this.owner.cell(this.x + offsets[0], this.y + offsets[1]))
      .filter(cell => cell);
  }
}

export class Nurikabe {
  cells: Cell[][] = [];

  solved: boolean = false;

  autoUnreachable: boolean = true;

  public cell(x: number, y: number): Cell {
    let row = this.cells[y];
    return row && row[x];
  }

  private allCellsSet(): Set<Cell> {
    let result = new Set<Cell>();
    for (let row of this.cells) {
      for (let cell of row) {
        result.add(cell);
      }
    }
    return result;
  }

  markUnreachable() {
    let unreachableCells = this.allCellsSet();
    let recurisveMark = (cell: Cell, depth: number) => {
      if (cell.value === Cell.WHITE || cell.value === Cell.EMPTY || cell.value === Cell.UNREACHABLE) {
        if (depth >= 1) {
          unreachableCells.delete(cell);
          cell.neighbors.forEach(neighbor => recurisveMark(neighbor, depth - 1));
        }
      }
    }
    for (let row of this.cells) {
      for (let cell of row) {
        if (cell.value === Cell.UNREACHABLE) {
          // unmark unreachable cells
          cell.value = Cell.EMPTY;
        }
        if (cell.numberCell) {
          unreachableCells.delete(cell);
          cell.neighbors.forEach(neighbor => recurisveMark(neighbor, +cell.value - 1));
        }
      }
    }
    console.log(unreachableCells);
    // directly set the value to avoid cellValueChanged() calls...
    unreachableCells.forEach(cell => {
      if (cell.value !== Cell.BLACK) {
        cell.value = Cell.UNREACHABLE
      }
    });
  }

  private updateThings() {
    if (this.autoUnreachable) {
      this.markUnreachable();
    }
    for (let row of this.cells) {
      for (let cell of row) {
        if (!cell.correct) {
          this.solved = false;
          return;
        }
      }
    }
    this.solved = true;
  }

  parse(board: string) {
    let size = -1;
    for (let i = 2; i <= 9; ++i) {
      if (i * i === board.length) {
        size = i;
        break;
      }
    }
    if (size === -1) {
      throw "unexpected board size: " + board.length
    }
    let newCells: Cell[][] = [];
    for (let y = 0; y < size; ++y) {
      let row: Cell[] = [];
      for (let x = 0; x < size; ++x) {
        row.push(Cell.parse(this, x, y, board.charAt(y * size + x)));
      }
      newCells.push(row);
    }

    this.cells = newCells;
    this.updateThings();
  }

  cellValueChanged(cell: Cell) {
    this.updateThings();
  }
}
