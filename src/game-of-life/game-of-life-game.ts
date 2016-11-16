import { bindable, observable, View } from 'aurelia-framework';
import { GameOfLife, Cell } from './game-of-life';

export class GameOfLifeGame {
  @observable
  size: string = "50";
  @observable({ changeHandler: 'delayOrRunChanged' })
  run: boolean = false;
  @observable({ changeHandler: 'delayOrRunChanged' })
  delay: string = "30";
  @observable({ changeHandler: 'drawCanvas' })
  cellSize: string = "8";

  @observable({ changeHandler: 'drawCanvas' })
  displayCanvas: boolean = true;
  displayTable: boolean = false;

  canvas: HTMLCanvasElement;

  game: GameOfLife;

  private intervalId: number = null;

  constructor() {
    this.sizeChanged();
  }

  attached() {
    this.drawCanvas();
  }

  detached() {
    this.clearInterval();
  }

  sizeChanged() {
    const oldGame = this.game;
    const size = +this.size;
    this.game = new GameOfLife(size, size);
    if (oldGame) {
      this.game.wrapAround = oldGame.wrapAround;
      this.game.copyStateFrom(oldGame);
    }
    this.drawCanvas();
  }

  private clearInterval() {
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  delayOrRunChanged() {
    this.clearInterval();
    if (this.run) {
      this.intervalId = window.setInterval(() => this.nextState(), this.delay);
    }
  }

  toggleRun() {
    this.run = !this.run;
  }

  nextState() {
    this.game.nextState();
    this.drawCanvas();
  }

  randomizeCells(probability: number) {
    this.game.randomizeCells(probability);
    this.drawCanvas();
  }

  click(cell: Cell) {
    cell.alive = !cell.alive;
    this.drawCanvas();
  }

  clickCanvas(e: MouseEvent) {
    const cellSize = +this.cellSize;
    const clientRect = this.canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - clientRect.left) / cellSize);
    const y = Math.floor((e.clientY - clientRect.top) / cellSize);
    const cell = this.game.cell(x, y);
    if (cell) {
      this.click(cell);
    }
  }

  private drawCanvas() {
    const canvas = this.canvas;
    const game = this.game;
    if (this.displayCanvas && canvas && game) {
      const liveColor = "red";
      const deadColor = "lightgrey";

      const cellSize = +this.cellSize;
      canvas.width = (game.width * cellSize) + 1;
      canvas.height = (game.height * cellSize) + 1;

      const context = canvas.getContext("2d");
      context.save();
      context.clearRect(0, 0, canvas.width, canvas.height);
      for (let x = 0; x < game.width; ++x) {
        for (let y = 0; y < game.height; ++y) {
          const alive = game.cellAlive(x, y);
          context.fillStyle = alive ? liveColor : deadColor
          context.fillRect((x * cellSize) + 1, (y * cellSize) + 1, cellSize - 1, cellSize - 1);
        }
      }
      context.restore();
    }
  }

}
