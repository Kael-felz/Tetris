import { PieceBase, Position } from "./piezabase";

export class PieceSquare extends PieceBase {
  constructor() {
    const initialBlocks: Position[] = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ];
    const pivot: Position = { x: 0.5, y: 0.5 };
    super("Square", initialBlocks, pivot);
  }

  public rotateLeft(): void {
    this.rotateBlocks("left");
  }

  public rotateRight(): void {
    this.rotateBlocks("right");
  }
}
