import { describe, expect, it } from "vitest";
import { PieceT } from "../../tetris/src/piezas/piezat";

describe("PieceT", () => {
  it("tiene la forma inicial correcta (T)", () => {
    const piece = new PieceT();

    expect(piece.getName()).toBe("T");
    expect(piece.getBlocks()).toEqual([
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
    ]);
  });

  it("rota a la derecha manteniendo 4 bloques", () => {
    const piece = new PieceT();

    piece.rotateRight();

    const blocks = piece.getBlocks().map(({ x, y }) => `${x},${y}`).sort();
    expect(piece.getBlocks()).toHaveLength(4);
    expect(blocks).toEqual(["1,0", "1,1", "1,2", "2,1"]);
  });

  it("rota a la izquierda manteniendo 4 bloques", () => {
    const piece = new PieceT();

    piece.rotateLeft();

    const blocks = piece.getBlocks().map(({ x, y }) => `${x},${y}`).sort();
    expect(piece.getBlocks()).toHaveLength(4);
    expect(blocks).toEqual(["0,1", "1,0", "1,1", "1,2"]);
  });

  it("cuatro rotaciones a la derecha vuelven a la forma original", () => {
    const piece = new PieceT();
    const original = [...piece.getBlocks()];

    piece.rotateRight();
    piece.rotateRight();
    piece.rotateRight();
    piece.rotateRight();

    expect(piece.getBlocks()).toEqual(original);
  });
});
