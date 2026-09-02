import { describe, expect, it } from "vitest";
import { PieceDog } from "../../src/pieces/piezaperro";

describe("PieceDog", () => {
  it("crea la variante izquierda con la forma esperada", () => {
    const piece = new PieceDog("left");

    expect(piece.getName()).toBe("Dog-left");
    expect(piece.getVariant()).toBe("left");
    expect(piece.getBlocks()).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
    ]);
  });

  it("crea la variante derecha con la forma esperada", () => {
    const piece = new PieceDog("right");

    expect(piece.getName()).toBe("Dog-right");
    expect(piece.getVariant()).toBe("right");
    expect(piece.getBlocks()).toEqual([
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ]);
  });

  it("permite rotar en ambos sentidos sin perder bloques", () => {
    const piece = new PieceDog("right");

    piece.rotateRight();
    piece.rotateLeft();

    expect(piece.getBlocks()).toHaveLength(4);
  });
});