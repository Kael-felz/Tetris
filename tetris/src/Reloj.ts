export class Reloj {
  private counter: number;

  constructor() {
    this.counter = 0;
  }

  public tick(): void {
    this.counter++;
  }

  public getCounter(): number {
    return this.counter;
  }

  public reset(): void {
    this.counter = 0;
  }
}
