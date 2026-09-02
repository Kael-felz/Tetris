import { describe, expect, it } from "vitest";
import { IRotator } from "../../tetris/src/piezas/Irotador";
import { PieceT } from "../../tetris/src/piezas/piezat";
import { PieceSquare } from "../../tetris/src/piezas/piezacuadrado";
import { PieceStick } from "../../tetris/src/piezas/piezapalito";
import { PieceL } from "../../tetris/src/piezas/piezal";
import { PieceDog } from "../../tetris/src/piezas/piezaperro";

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
