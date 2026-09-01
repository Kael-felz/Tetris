/**
 * Contrato que deben cumplir todos los objetos capaces de rotar
 * sobre su propio eje, a izquierda o a derecha.
 */
export interface IRotator {
  rotateLeft(): void;
  rotateRight(): void;
}
