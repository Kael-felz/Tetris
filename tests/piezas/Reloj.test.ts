import { describe, expect, it } from "vitest";
import { Reloj } from "../../tetris/src/Reloj";

describe("Reloj", () => {
  it("comienza en 0", () => {
    const reloj = new Reloj();
    expect(reloj.getCounter()).toBe(0);
  });

  it("tick() incrementa el contador de a uno (no maneja hora)", () => {
    const reloj = new Reloj();

    reloj.tick();
    expect(reloj.getCounter()).toBe(1);

    reloj.tick();
    reloj.tick();
    expect(reloj.getCounter()).toBe(3);
  });

  it("reset() vuelve el contador a 0", () => {
    const reloj = new Reloj();

    reloj.tick();
    reloj.tick();
    reloj.reset();

    expect(reloj.getCounter()).toBe(0);
  });
});