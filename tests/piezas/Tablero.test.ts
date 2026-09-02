import { afterEach, describe, expect, it, vi } from "vitest";
import { Tablero } from "../../tetris/src/Tablero";
import { Reloj } from "../../tetris/src/Reloj";

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
});
