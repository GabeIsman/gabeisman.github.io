import "./types.ts";

export default class Canvas {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  gridSize: number;

  constructor(canvas: HTMLCanvasElement) {
    const context = canvas.getContext("2d");

    if (!context) {
      throw new TypeError("2d context not supported.");
    }

    this.context = context;
    this.canvas = canvas;
  }

  draw(drawable: Drawable, point: Point, color: string) {
    const currentStyle = this.context.fillStyle;
    this.context.fillStyle = color;
    drawable.draw(this.context, point);
    this.context.fillStyle = currentStyle;
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  sizeToScreen() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
}
