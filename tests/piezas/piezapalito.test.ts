import { describe, expect, it } from "vitest";
import { PieceStick } from "../../tetris/src/piezas/piezapalito";

describe("PieceStick", () => {
  it("crea un palo de longitud 4 en la fila superior", () => {
    const piece = new PieceStick();

    expect(piece.getName()).toBe("Stick");
    expect(piece.getBlocks()).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
    ]);
  });

  it("permite rotar sin perder bloques", () => {
    const piece = new PieceStick();

    piece.rotateRight();
    expect(piece.getBlocks()).toHaveLength(4);

    piece.rotateLeft();
    expect(piece.getBlocks()).toHaveLength(4);
  });
});
