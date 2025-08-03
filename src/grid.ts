import "./types";

export default class Grid implements Drawable {
  dimensions: Point;
  grid: Array<Array<number>>;
  cellSize: number;

  constructor(dimensions: Point, cellSize: number) {
    this.dimensions = dimensions;
    this.cellSize = cellSize;
    this.resetGrid();
  }

  draw(context: CanvasRenderingContext2D, point: Point) {
    context.beginPath();
    for (let x = 0; x < this.dimensions.x; x++) {
      for (let y = 0; y < this.dimensions.y; y++) {
        if (this.grid[y][x] > 0) {
          context.fillRect(
            point.x + x * this.cellSize,
            point.y + y * this.cellSize,
            this.cellSize,
            this.cellSize
          );
        }
      }
    }
    context.stroke();
  }

  mapPoints(fn: (value: number, point: Point) => number) {
    const nextGrid = structuredClone(this.grid);
    for (let x = 0; x < this.dimensions.x; x++) {
      for (let y = 0; y < this.dimensions.y; y++) {
        nextGrid[y][x] = fn(this.grid[y][x], { x, y });
      }
    }
    this.grid = nextGrid;
  }

  sumOfNeighboringValues(point: Point): number {
    return this.neighboringValues(point).reduce((sum, value) => sum + value, 0);
  }

  placePattern(pattern: Array<Array<number>>, point: Point) {
    for (let y = 0; y < pattern.length; y++) {
      for (let x = 0; x < pattern[y].length; x++) {
        this.setValue({ x: point.x + x, y: point.y + y }, pattern[y][x]);
      }
    }
  }

  randomize(threshold: number) {
    this.mapPoints(() => (Math.random() > threshold ? 1 : 0));
  }

  resize(dimensions: Point) {
    if (dimensions.x <= 0 || dimensions.y <= 0) {
      throw new Error("Dimensions must be greater than 0.");
    }
    this.dimensions = dimensions;
    const oldGrid = structuredClone(this.grid);
    this.resetGrid();
    this.placePattern(oldGrid, { x: 0, y: 0 });
  }

  getValue(point: Point) {
    const wrappedPoint = this.wrap(point);
    return this.grid[wrappedPoint.y][wrappedPoint.x];
  }

  setValue(point: Point, value: number) {
    const wrappedPoint = this.wrap(point);
    this.grid[wrappedPoint.y][wrappedPoint.x] = value;
  }

  private wrap(point: Point): Point {
    return {
      x: (point.x + this.dimensions.x) % this.dimensions.x,
      y: (point.y + this.dimensions.y) % this.dimensions.y,
    };
  }

  private neighboringValues(point: Point): Array<number> {
    return [
      this.getValue({ x: point.x - 1, y: point.y - 1 }) ?? 0,
      this.getValue({ x: point.x, y: point.y - 1 }) ?? 0,
      this.getValue({ x: point.x + 1, y: point.y - 1 }) ?? 0,
      this.getValue({ x: point.x - 1, y: point.y }) ?? 0,
      this.getValue({ x: point.x + 1, y: point.y }) ?? 0,
      this.getValue({ x: point.x - 1, y: point.y + 1 }) ?? 0,
      this.getValue({ x: point.x, y: point.y + 1 }) ?? 0,
      this.getValue({ x: point.x + 1, y: point.y + 1 }) ?? 0,
    ];
  }

  private resetGrid() {
    this.grid = Array.from({ length: this.dimensions.y }, () =>
      Array.from({ length: this.dimensions.x }, () => 0)
    );
  }
}
