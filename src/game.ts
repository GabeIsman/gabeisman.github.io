import Canvas from "./canvas.ts";
import Grid from "./grid.ts";
import {
  ACORN,
  BLOCK_ENGINE,
  GLIDER_GUN,
  GLIDER,
  BLINKER,
} from "./patterns.ts";

export default class Game {
  canvas: Canvas;
  grid: Grid;
  tickSpeed: number; // ms
  lastTick: number; // ms
  cellSize: number; // px

  constructor(canvas: Canvas, tickSpeed: number, cellSize = 3) {
    if (cellSize <= 0) {
      throw new Error("Cell size must be greater than 0.");
    }

    if (tickSpeed <= 0) {
      throw new Error("Tick speed must be greater than 0.");
    }

    this.cellSize = cellSize;
    this.canvas = canvas;
    this.lastTick = 0;
    this.grid = new Grid(this.gridDimensions(), this.cellSize);
    this.tickSpeed = tickSpeed;
    window.addEventListener("resize", () =>
      this.grid.resize(this.gridDimensions())
    );
  }

  start() {
    this.grid.placePattern(BLOCK_ENGINE, { x: 300, y: 200 });
    this.grid.placePattern(GLIDER_GUN, { x: 500, y: 100 });
    this.grid.placePattern(GLIDER_GUN.transpose(), {
      x: 400,
      y: 10,
    });
    this.grid.placePattern(ACORN, { x: 100, y: 200 });
    this.tick();
  }

  private tick() {
    requestAnimationFrame((time) => {
      if (time - this.lastTick >= this.tickSpeed) {
        this.updateGameState();
        this.render();
        this.lastTick = time;
      }
      this.tick();
    });
  }

  private updateGameState() {
    this.grid.mapPoints((value: number, point: Point): number => {
      const sum = this.grid.sumOfNeighboringValues(point);
      // Living cell survives with 2 neighbors
      if (value === 1 && sum === 2) {
        return 1;
        // Any cell lives with 3
      } else if (sum === 3) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  private render() {
    this.canvas.clear();
    this.canvas.draw(this.grid, { x: 0, y: 0 }, "dodgerblue");
  }

  private gridDimensions(): Point {
    return {
      x: Math.ceil(window.innerWidth / this.cellSize),
      y: Math.ceil(window.innerHeight / this.cellSize),
    };
  }
}
