import { PieceBase, Position } from "./piezabase";

export type DogVariant = "left" | "right";

export class PieceDog extends PieceBase {
  private readonly variant: DogVariant;

  constructor(variant: DogVariant) {
    const { blocks, pivot } = PieceDog.initialShape(variant);
    super(`Dog-${variant}`, blocks, pivot);
    this.variant = variant;
  }

  private static initialShape(variant: DogVariant): { blocks: Position[]; pivot: Position } {
    if (variant === "right") {
      return {
        blocks: [
          { x: 1, y: 0 },
          { x: 2, y: 0 },
          { x: 0, y: 1 },
          { x: 1, y: 1 },
        ],
        pivot: { x: 1, y: 1 },
      };
    }
    return {
      blocks: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
      ],
      pivot: { x: 1, y: 1 },
    };
  }

  public getVariant(): DogVariant {
    return this.variant;
  }

  public rotateLeft(): void {
    this.rotateBlocks("left");
  }

  public rotateRight(): void {
    this.rotateBlocks("right");
  }
}
