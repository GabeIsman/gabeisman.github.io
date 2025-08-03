import Canvas from "./canvas.ts";
import Game from "./game.ts";

const canvasElement: HTMLCanvasElement | null =
  document.querySelector("canvas");

if (!canvasElement) {
  throw new TypeError("No canvas found.");
}

const canvas = new Canvas(canvasElement);
const game = new Game(canvas, 60);
game.start();
