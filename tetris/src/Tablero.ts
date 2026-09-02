import { PieceBase, Position } from "./pieces/piezabase";
import { Reloj } from "./Reloj";

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

  getWidth() { return Tablero.WIDTH; }
  getHeight() { return Tablero.HEIGHT; }
  getCells() { return this.cells; }
  getCurrentPiece() { return this.currentPiece; }
  getCurrentPosition() { return this.currentPosition; }
  getPieces() { return this.pieces; }
  isGameOver() { return this.gameOver; }
  lineCount() { return this.linesRemoved; }

  addPiece(piece: PieceBase): boolean {
    if (this.gameOver) return false;
    for (let i = 0; i < Math.floor(Math.random() * 4); i++) piece.rotateRight();
    const width = Math.max(...piece.getBlocks().map((b) => b.x)) - Math.min(...piece.getBlocks().map((b) => b.x)) + 1;
    const pos = { x: Math.max(0, Math.floor(Math.random() * (Tablero.WIDTH - width + 1))), y: 0 };
    if (!this.fits(piece, pos)) { this.gameOver = true; return false; }
    this.currentPiece = piece; this.currentPosition = pos; this.pieces.push(piece); return true;
  }