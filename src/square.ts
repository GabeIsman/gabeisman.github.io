import "./types";

export default class Square implements Drawable {
  draw(context: CanvasRenderingContext2D, point: Point, size: number) {
    context.fillRect(point.x, point.y, size, size);
  }
}
