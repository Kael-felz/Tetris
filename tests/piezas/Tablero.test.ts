import { afterEach, describe, expect, it, vi } from "vitest";
import { Tablero } from "../../tetris/src/Tablero";
import { Reloj } from "../../tetris/src/Reloj";
import { PieceSquare } from "../../tetris/src/piezas/piezacuadrado";
import { PieceT } from "../../tetris/src/piezas/piezat";
import { PieceStick } from "../../tetris/src/piezas/piezapalito";
import { PieceDog } from "../../tetris/src/piezas/piezaperro";

const make = () => new Tablero(new Reloj());

describe("Tablero", () => {
  afterEach(() => vi.restoreAllMocks());

  it("inicializa y valida formato", () => {
    const t = make();
    expect(t.getWidth()).toBe(10);
    expect(t.getHeight()).toBe(20);
    expect(t.getCells()).toHaveLength(20);
    expect(t.getCells()[0]).toHaveLength(10);
    expect(t.getCells().flat().every((c) => c === false)).toBe(true);
    expect(t.getCurrentPiece()).toBeNull();
    expect(t.isGameOver()).toBe(false);
    expect(t.lineCount()).toBe(0);
  });
 it("agrega, mueve y mantiene la pieza dentro del tablero", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    const t = make();
    const p = new PieceSquare();
    expect(t.addPiece(p)).toBe(true);
    expect(t.getCurrentPiece()).toBe(p);
    expect(t.getPieces()).toContain(p);
    expect(t.getCurrentPosition().y).toBe(0);
    expect(t.moveDown()).toBe(true);
    expect(t.getCurrentPosition().y).toBe(1);
    const xs = p.getBlocks().map((b) => b.x + t.getCurrentPosition().x);
    expect(Math.min(...xs)).toBeGreaterThanOrEqual(0);
    expect(Math.max(...xs)).toBeLessThan(t.getWidth());
  });
  it("cuenta las líneas completas que elimina", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    const t = make();
    const cells = t.getCells();
    for (let y = Tablero.HEIGHT - 2; y < Tablero.HEIGHT; y++) {
      for (let x = 0; x < Tablero.WIDTH - 2; x++) cells[y][x] = true;
    }

    t.addPiece(new PieceSquare());
    (t as any).currentPosition = { x: Tablero.WIDTH - 2, y: Tablero.HEIGHT - 2 };
    expect(t.moveDown()).toBe(false);

    expect(t.lineCount()).toBe(2);
  });

  it("pierde al alcanzar el límite usando únicamente piezas Dog", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    const t = make();

    for (let i = 0; i < Tablero.HEIGHT / 2; i++) {
      expect(t.addPiece(new PieceDog("left"))).toBe(true);
      while (t.moveDown()) {
        // Deja caer cada pieza hasta que alcance el límite del tablero.
      }
    }

    expect(t.isGameOver()).toBe(false);
    expect(t.addPiece(new PieceDog("left"))).toBe(false);
    expect(t.isGameOver()).toBe(true);
  });
 it("rota solo si cabe y se niega si no cabe", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.3);
    const t = make();
    const p = new PieceT();
    t.addPiece(p);
    (t as any).currentPosition = { x: 4, y: 5 };
    expect(t.rotateRight()).toBe(true);

    const s = new PieceStick();
    t.addPiece(s);
    (t as any).currentPosition = { x: 0, y: 19 };
    expect(t.rotateRight()).toBe(false);
  });

  it("bloquea movimientos cuando termina el juego", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    const t = make();
    const cells = t.getCells();
    for (let x = 0; x < Tablero.WIDTH; x++) cells[0][x] = true;
    expect(t.addPiece(new PieceSquare())).toBe(false);
    expect(t.isGameOver()).toBe(true);
    expect(t.addPiece(new PieceT())).toBe(false);
    expect(t.moveDown()).toBe(false);
    expect(t.rotateLeft()).toBe(false);
    expect(t.rotateRight()).toBe(false);
  });
});