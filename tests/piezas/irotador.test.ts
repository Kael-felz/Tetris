import { describe, expect, it } from "vitest";
import { IRotator } from "../../src/pieces/irotador";
import { PieceT } from "../../src/pieces/piezat";
import { PieceSquare } from "../../src/pieces/piezacuadrado";
import { PieceStick } from "../../src/pieces/piezapalito";
import { PieceL } from "../../src/pieces/piezal";
import { PieceDog } from "../../src/pieces/piezaperro";

describe("IRotator", () => {
  it("todas las piezas del juego implementan rotateLeft y rotateRight", () => {
    const pieces: IRotator[] = [
      new PieceT(),
      new PieceSquare(),
      new PieceStick(),
      new PieceL("left"),
      new PieceDog("right"),
    ];

    for (const piece of pieces) {
      expect(typeof piece.rotateLeft).toBe("function");
      expect(typeof piece.rotateRight).toBe("function");
    }
  });
});
