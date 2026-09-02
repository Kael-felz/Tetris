import { PieceBase, Position } from "./piezas/piezabase";
import { Reloj } from "./reloj";

export class Tablero {
  static readonly WIDTH = 10;
  static readonly HEIGHT = 20;
  private cells: boolean[][];
  private readonly reloj: Reloj;
  private pieces: PieceBase[] = [];
  private currentPiece: PieceBase | null = null;
  private currentPosition: Position = { x: 0, y: 0 };
  private linesRemoved = 0;
  private gameOver = false;

  constructor(reloj: Reloj) {
    this.reloj = reloj;
    this.cells = Array.from({ length: Tablero.HEIGHT }, () => Array(Tablero.WIDTH).fill(false));
  }

  getWidth(): number { return Tablero.WIDTH; }
  getHeight(): number { return Tablero.HEIGHT; }
  getCells(): boolean[][] { return this.cells; }
  getCurrentPiece(): PieceBase | null { return this.currentPiece; }
  getCurrentPosition(): Position { return this.currentPosition; }
  getPieces(): PieceBase[] { return this.pieces; }
  isGameOver(): boolean { return this.gameOver; }
  lineCount(): number { return this.linesRemoved; }

  addPiece(piece: PieceBase): boolean {
    if (this.gameOver) return false;
    for (let i = 0; i < Math.floor(Math.random() * 4); i++) piece.rotateRight();
    const width = Math.max(...piece.getBlocks().map((b: Position) => b.x)) - Math.min(...piece.getBlocks().map((b: Position) => b.x)) + 1;
    const pos = { x: Math.max(0, Math.floor(Math.random() * (Tablero.WIDTH - width + 1))), y: 0 };
    if (!this.fits(piece, pos)) { this.gameOver = true; return false; }
    this.currentPiece = piece; this.currentPosition = pos; this.pieces.push(piece); return true;
  }

  moveDown(): boolean {
    if (!this.currentPiece || this.gameOver) return false;
    const next = { x: this.currentPosition.x, y: this.currentPosition.y + 1 };
    if (this.fits(this.currentPiece, next)) { this.currentPosition = next; return true; }
    this.lockCurrentPiece(); return false;
  }

  rotateLeft(): boolean { return this.tryRotate("left"); }
  rotateRight(): boolean { return this.tryRotate("right"); }

  private lockCurrentPiece(): void {
    if (!this.currentPiece) return;
    this.absoluteBlocks(this.currentPiece, this.currentPosition).forEach(({ x, y }: Position) => {
      if (x >= 0 && x < Tablero.WIDTH && y >= 0 && y < Tablero.HEIGHT) this.cells[y][x] = true;
    });
    this.currentPiece = null; this.clearCompletedLines();
  }

  private clearCompletedLines(): void {
    const remaining = this.cells.filter((row: boolean[]) => !row.every(Boolean));
    const removed = Tablero.HEIGHT - remaining.length;
    if (removed > 0) { this.linesRemoved += removed; this.cells = [...Array.from({ length: removed }, () => Array(Tablero.WIDTH).fill(false)), ...remaining]; }
  }

  private absoluteBlocks(piece: PieceBase, position: Position): Position[] {
    return piece.getBlocks().map((b: Position) => ({ x: Math.round(b.x + position.x), y: Math.round(b.y + position.y) }));
  }

  private fits(piece: PieceBase, position: Position): boolean {
    return this.absoluteBlocks(piece, position).every(({ x, y }: Position) => (x < 0 || x >= Tablero.WIDTH || y < 0 || y >= Tablero.HEIGHT) ? false : !this.cells[y][x]);
  }

  private tryRotate(direction: "left" | "right"): boolean {
    if (!this.currentPiece || this.gameOver) return false;
    if (direction === "right") { this.currentPiece.rotateRight(); if (this.fits(this.currentPiece, this.currentPosition)) return true; this.currentPiece.rotateLeft(); return false; }
    this.currentPiece.rotateLeft(); if (this.fits(this.currentPiece, this.currentPosition)) return true; this.currentPiece.rotateRight(); return false;
  }
}
