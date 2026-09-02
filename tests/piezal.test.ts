import { describe, expect, it } from "vitest";
import { PieceL } from "../tetris/src/piezas/piezal";

describe("PieceL", () => {
  it("crea la variante izquierda con la forma esperada", () => {
    const piece = new PieceL("left");

    expect(piece.getName()).toBe("L-left");
    expect(piece.getVariant()).toBe("left");
    expect(piece.getBlocks()).toEqual([
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 0, y: 2 },
    ]);
  });

  it("crea la variante derecha con la forma esperada", () => {
    const piece = new PieceL("right");

    expect(piece.getName()).toBe("L-right");
    expect(piece.getVariant()).toBe("right");
    expect(piece.getBlocks()).toEqual([
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 1, y: 2 },
    ]);
  });

  it("permite rotar en ambos sentidos sin perder bloques", () => {
    const piece = new PieceL("left");

    piece.rotateRight();
    piece.rotateLeft();

    expect(piece.getBlocks()).toHaveLength(4);
  });

  it("las dos variantes no son iguales entre si", () => {
    const left = new PieceL("left");
    const right = new PieceL("right");

    expect(left.equals(right)).toBe(false);
  });
});
