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

  it("gana al completar cinco líneas usando únicamente piezas cuadrado", () => {
    const xPositions = [0, 2, 4, 6, 8];
    let randomCalls = 0;
    let squareNumber = 0;
    vi.spyOn(Math, "random").mockImplementation(() => {
      const callInPiece = randomCalls++ % 3;
      if (callInPiece === 0) return 0.21;
      if (callInPiece === 1) return 0;
      return (xPositions[squareNumber++ % xPositions.length] + 0.1) / 9;
    });
    const game = new Tetris(5);
    game.start();

    for (let i = 0; i < 400 && game.state() === "JUGANDO"; i++) {
      game.tick();
    }

    expect(game.getTablero().lineCount()).toBeGreaterThanOrEqual(5);
    expect(game.state()).toBe("FINALIZADO");
  });

  it("puede crear piezas L y Dog según el valor aleatorio", () => {
    const random = vi.spyOn(Math, "random");
    random.mockReturnValue(0.7);
    const gameL = new Tetris();
    gameL.start();
    expect(gameL.getTablero().getCurrentPiece()?.getName()).toMatch(/^L-/);

    random.mockReturnValue(0.8);
    const gameDog = new Tetris();
    gameDog.start();
    expect(gameDog.getTablero().getCurrentPiece()?.getName()).toMatch(/^Dog-/);
  });
});