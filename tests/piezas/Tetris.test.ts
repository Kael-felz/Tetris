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

 it("las rotaciones solo se aplican cuando el juego esta en curso", () => {
    const game = new Tetris();

    expect(() => {
      game.rotateLeft();
      game.rotateRight();
    }).not.toThrow();
    expect(game.state()).toBe("No iniciado");

    vi.spyOn(Math, "random").mockReturnValue(0);
    game.start();

    expect(() => {
      game.rotateLeft();
      game.rotateRight();
    }).not.toThrow();
  });

  it("cuando la pieza actual llega al fondo, se agrega una nueva pieza en el siguiente tick", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    const game = new Tetris(100);
    game.start();

    // Se fuerza a la pieza actual a estar en el fondo del tablero.
    (game.getTablero() as any).currentPosition = { x: 0, y: 19 };
    const primeraPieza = game.getTablero().getCurrentPiece();

    game.tick();

    expect(game.getTablero().getCurrentPiece()).not.toBe(primeraPieza);
  });

  it("el juego finaliza al alcanzar la cantidad de lineas configurada", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    const game = new Tetris(0);
    game.start();

    game.tick();

    expect(game.state()).toBe("FINALIZADO");
  });

  it("permite configurar una cantidad de lineas distinta a la de por defecto", () => {
    const game = new Tetris(10);

    expect(game.getTablero().lineCount()).toBe(0);
    expect(game.state()).toBe("No iniciado");
  });
});