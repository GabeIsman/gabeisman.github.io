interface Point {
  x: number;
  y: number;
}

interface Drawable {
  draw: (context: CanvasRenderingContext2D, point: Point) => void;
}
