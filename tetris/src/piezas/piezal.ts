import { PieceBase, Position } from "./piezabase";

export type LVariant = "left" | "right";

export class PieceL extends PieceBase {
  private readonly variant: LVariant;

  constructor(variant: LVariant) {
    const { blocks, pivot } = PieceL.initialShape(variant);
    super(`L-${variant}`, blocks, pivot);
    this.variant = variant;
  }

  private static initialShape(variant: LVariant): { blocks: Position[]; pivot: Position } {
    if (variant === "right") {
      return {
        blocks: [
          { x: 0, y: 0 },
          { x: 0, y: 1 },
          { x: 0, y: 2 },
          { x: 1, y: 2 },
        ],
        pivot: { x: 0, y: 1 },
      };
    }
    return {
      blocks: [
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 0, y: 2 },
      ],
      pivot: { x: 1, y: 1 },
    };
  }

  public getVariant(): LVariant {
    return this.variant;
  }

  public rotateLeft(): void {
    this.rotateBlocks("left");
  }

  public rotateRight(): void {
    this.rotateBlocks("right");
  }
}
