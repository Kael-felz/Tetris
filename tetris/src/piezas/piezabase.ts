import { IRotator } from "./Irotador";

export interface Position {
  x: number;
  y: number;
}

export abstract class PieceBase implements IRotator {
  protected name: string;
  protected blocks: Position[];
  protected readonly pivot: Position;

  constructor(name: string, blocks: Position[], pivot: Position) {
    if (blocks.length !== 4) {
      throw new Error("Toda pieza debe estar formada por exactamente 4 elementos.");
    }
    this.name = name;
    this.blocks = blocks;
    this.pivot = pivot;
  }

  public getName(): string {
    return this.name;
  }

  public getBlocks(): Position[] {
    return this.blocks;
  }

  protected rotateBlocks(direction: "left" | "right"): void {
    this.blocks = this.blocks.map(({ x, y }) => {
      const dx = x - this.pivot.x;
      const dy = y - this.pivot.y;
      const [ndx, ndy] = direction === "right" ? [-dy, dx] : [dy, -dx];
      return { x: this.pivot.x + ndx, y: this.pivot.y + ndy };
    });
  }

  public equals(other: PieceBase | null | undefined): boolean {
    if (!other) return false;
    if (this === other) return true;
    if (this.name !== other.name) return false;
    if (this.blocks.length !== other.blocks.length) return false;

    const toKey = (p: Position) => `${p.x},${p.y}`;
    const mine = [...this.blocks].map(toKey).sort();
    const theirs = [...other.blocks].map(toKey).sort();
    return mine.every((k, i) => k === theirs[i]);
  }

  public abstract rotateLeft(): void;
  public abstract rotateRight(): void;
}