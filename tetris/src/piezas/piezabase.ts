import { IRotator } from "./Irotador";

/** Coordenada relativa de un bloque dentro de una pieza. */
export interface Position {
  x: number;
  y: number;
}

/**
 * Clase base abstracta para todas las piezas del Tetris.
 * Toda pieza se compone de exactamente 4 "elementos" (bloques) y
 * sabe rotar sobre su propio eje (pivote) hacia la izquierda o la derecha.
 */
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

  /**
   * Rota los 4 bloques 90 grados sobre el pivote de la pieza.
   * Se utiliza la matriz de rotación estándar:
   *  - derecha: (x, y) -> (-y, x)
   *  - izquierda: (x, y) -> (y, -x)
   */
  protected rotateBlocks(direction: "left" | "right"): void {
    this.blocks = this.blocks.map(({ x, y }) => {
      const dx = x - this.pivot.x;
      const dy = y - this.pivot.y;
      const [ndx, ndy] = direction === "right" ? [-dy, dx] : [dy, -dx];
      return { x: this.pivot.x + ndx, y: this.pivot.y + ndy };
    });
  }

  /**
   * Igualdad estructural entre piezas: dos piezas son iguales si tienen
   * el mismo nombre y exactamente los mismos bloques (sin importar el orden).
   */
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