import { Tablero } from "./Tablero";
import { Reloj } from "./reloj";
import { PieceBase } from "./piezas/piezabase";
import { PieceT } from "./piezas/piezat";
import { PieceSquare } from "./piezas/piezacuadrado";
import { PieceStick } from "./piezas/piezapalito";
import { PieceL } from "./piezas/piezal";
import { PieceDog } from "./piezas/piezaperro";

export type GameState = "No iniciado" | "JUGANDO" | "FINALIZADO";

export class Tetris {
  private readonly tablero: Tablero;
  private readonly reloj: Reloj;
  private readonly linesToFinish: number;
  private currentState: GameState;

  constructor(linesToFinish: number = 5) {
    this.reloj = new Reloj();
    this.tablero = new Tablero(this.reloj);
    this.linesToFinish = linesToFinish;
    this.currentState = "No iniciado";
  }

  public start(): void {
    this.currentState = "JUGANDO";
    this.spawnRandomPiece();
  }

  public state(): GameState {
    return this.currentState;
  }

  public tick(): void {
    if (this.currentState !== "JUGANDO") return;

    this.reloj.tick();

    const hadCurrentPiece = this.tablero.getCurrentPiece() !== null;
    const couldMoveDown = this.tablero.moveDown();

    if (hadCurrentPiece && !couldMoveDown) {
      this.spawnRandomPiece();
    }

    if (this.tablero.isGameOver() || this.tablero.lineCount() >= this.linesToFinish) {
      this.currentState = "FINALIZADO";
    }
  }

  public rotateLeft(): void {
    if (this.currentState === "JUGANDO") {
      this.tablero.rotateLeft();
    }
  }

  public rotateRight(): void {
    if (this.currentState === "JUGANDO") {
      this.tablero.rotateRight();
    }
  }

  public getTablero(): Tablero {
    return this.tablero;
  }

  public getReloj(): Reloj {
    return this.reloj;
  }

  private spawnRandomPiece(): void {
    const piece = this.createRandomPiece();
    const added = this.tablero.addPiece(piece);
    if (!added) {
      this.currentState = "FINALIZADO";
    }
  }

  private createRandomPiece(): PieceBase {
    const builders: Array<() => PieceBase> = [
      () => new PieceT(),
      () => new PieceSquare(),
      () => new PieceStick(),
      () => new PieceL(Math.random() < 0.5 ? "left" : "right"),
      () => new PieceDog(Math.random() < 0.5 ? "left" : "right"),
    ];
    const index = Math.floor(Math.random() * builders.length);
    return builders[index]();
  }
}
