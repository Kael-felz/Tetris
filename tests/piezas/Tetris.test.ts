import { afterEach, describe, expect, it, vi } from "vitest";
import { Tetris } from "../../tetris/src/Tetris";

describe("Tetris", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("se puede crear un juego en estado NO start", () => {
    const game = new Tetris();

    expect(game.state()).toBe("No iniciado");
    expect(game.getTablero()).toBeDefined();
    expect(game.getReloj()).toBeDefined();
    expect(game.getReloj().getCounter()).toBe(0);
  });

  it("start() inicia el juego y agrega la primera pieza", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    const game = new Tetris();

    game.start();

    expect(game.state()).toBe("JUGANDO");
    expect(game.getTablero().getCurrentPiece()).not.toBeNull();
    expect(game.getTablero().getPieces().length).toBeGreaterThan(0);
  });

  it("tick() hace avanzar el reloj y mueve la pieza actual en el tablero", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    const game = new Tetris();
    game.start();

    const before = game.getReloj().getCounter();
    game.tick();

    expect(game.getReloj().getCounter()).toBe(before + 1);
  });

  it("tick() no hace nada si el juego no esta en curso", () => {
    const game = new Tetris();

    game.tick();

    expect(game.state()).toBe("No iniciado");
    expect(game.getReloj().getCounter()).toBe(0);
  });
});
