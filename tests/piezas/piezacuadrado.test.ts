import { describe, expect, it } from "vitest";
import { PieceSquare } from "../../src/pieces/piezacuadrado";

describe("PieceSquare", () => {
  it("tiene la forma de un cuadrado de 2x2", () => {
    const piece = new PieceSquare();

    expect(piece.getName()).toBe("Square");
    expect(piece.getBlocks()).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ]);
  });

  it("mantiene la misma forma al rotar (pieza simétrica)", () => {
    const piece = new PieceSquare();

    piece.rotateRight();
    piece.rotateLeft();

    expect(piece.getBlocks()).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ]);
  });
});
