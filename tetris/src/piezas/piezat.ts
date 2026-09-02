import { PieceBase, Position } from "./piezabase";

export class PieceT extends PieceBase {
  constructor() {
    const initialBlocks: Position[] = [
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
    ];
    const pivot: Position = { x: 1, y: 1 };
    super("T", initialBlocks, pivot);
  }

  public rotateLeft(): void {
    this.rotateBlocks("left");
  }

  public rotateRight(): void {
    this.rotateBlocks("right");
  }
}
