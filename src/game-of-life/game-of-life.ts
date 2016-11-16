
export class Cell {
  nextAlive: boolean;

  constructor(public alive: boolean = false) { }
}

export class GameOfLife {
  cells: Cell[][] = [];

  generation: number = 0;

  constructor(public readonly width: number, public readonly height: number, public wrapAround: boolean = true) {
    for (let y = 0; y < height; ++y) {
      const row: Cell[] = [];
      for (let x = 0; x < width; ++x) {
        row.push(new Cell());
      }
      this.cells.push(row);
    }
  }

  cell(x: number, y: number): Cell {
    const mod = (n: number, m: number) => ((n % m) + m) % m;
    const row = this.cells[this.wrapAround ? mod(y, this.height) : y];
    return row && row[this.wrapAround ? mod(x, this.width) : x];
  }

  cellAlive(x: number, y: number): boolean {
    const cell = this.cell(x, y);
    return !!(cell && cell.alive);
  }

  randomizeCells(probability: number) {
    for (let row of this.cells) {
      for (let cell of row) {
        cell.alive = Math.random() <= probability;
      }
    }
  }

  copyStateFrom(other: GameOfLife) {
    for (let y = 0; y < this.height; ++y) {
      for (let x = 0; x < this.width; ++x) {
        this.cell(x, y).alive = other.cellAlive(x, y);
      }
    }
  }

  private threeSum(x: number, y: number) {
    let result = 0;

    result += this.cellAlive(x, y - 1) ? 1 : 0;
    result += this.cellAlive(x, y) ? 1 : 0;
    result += this.cellAlive(x, y + 1) ? 1 : 0;

    return result;
  }

  nextState() {
    for (let y = 0; y < this.height; ++y) {
      let nc = this.threeSum(-1, y) + this.threeSum(0, y);
      for (let x = 0; x < this.width; ++x) {
        nc += this.threeSum(x + 1, y);

        this.cell(x, y).nextAlive =
          nc == 3 || (nc == 4 && this.cellAlive(x, y));

        if (nc > 0) {
          nc -= this.threeSum(x - 1, y);
        }
      }
    }

    // finally update all states to the new state
    for (let row of this.cells) {
      for (let cell of row) {
        cell.alive = cell.nextAlive;
      }
    }
    ++this.generation;
  }

}