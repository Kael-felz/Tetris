import { PieceBase, Position } from "./piezabase";

export class PieceStick extends PieceBase {
  constructor() {
    const initialBlocks: Position[] = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
    ];
    const pivot: Position = { x: 1.5, y: 0 };
    super("Stick", initialBlocks, pivot);
  }

  public rotateLeft(): void {
    this.rotateBlocks("left");
  }

  public rotateRight(): void {
    this.rotateBlocks("right");
  }
}
