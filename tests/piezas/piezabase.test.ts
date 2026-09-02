import { describe, expect, it } from "vitest";
import { PieceBase, Position } from "../../tetris/src/piezas/piezabase";

class TestPiece extends PieceBase {
  constructor(name = "Test", blocks: Position[] = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
  ]) {
    super(name, blocks, { x: 0, y: 0 });
  }

  public rotateLeft(): void {}
  public rotateRight(): void {}
}

describe("PieceBase", () => {
  it("rechaza piezas que no tienen cuatro bloques", () => {
    expect(() => new TestPiece("Invalid", [{ x: 0, y: 0 }])).toThrow(
      "Toda pieza debe estar formada por exactamente 4 elementos.",
    );
  });

  it("compara piezas por nombre y posiciones", () => {
    const piece = new TestPiece();
    expect(piece.equals(piece)).toBe(true);
    expect(piece.equals(null)).toBe(false);
    expect(piece.equals(new TestPiece("Other"))).toBe(false);
    expect(piece.equals(new TestPiece())).toBe(true);

    const different = new TestPiece("Test", [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 2, y: 2 },
    ]);
    expect(piece.equals(different)).toBe(false);
  });
});
