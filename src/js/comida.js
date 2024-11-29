class Comida {
  constructor(colores) {
    this.colores = colores;
    this.posicion = null;
  }

  generar(tablero) {
    let x = Math.floor(Math.random() * tablero.columnas);
    let y = Math.floor(Math.random() * tablero.filas);

    // Asegurarse de que no haya comida en la misma posición
    while (tablero.tablero[y][x] === 1) {
      x = Math.floor(Math.random() * tablero.columnas);
      y = Math.floor(Math.random() * tablero.filas);
    }

    tablero.tablero[y][x] = 2; // Marca la comida en el tablero
    this.posicion = {
      x: x,
      y: y,
      color: this.colores[Math.floor(Math.random() * this.colores.length)],
    };
  }

  dibujar(ctx, tamanoCeldaX, tamanoCeldaY) {
    if (this.posicion) {
      ctx.fillStyle = this.posicion.color;
      ctx.fillRect(
        this.posicion.x * tamanoCeldaX,
        this.posicion.y * tamanoCeldaY,
        tamanoCeldaX,
        tamanoCeldaY
      );
    }
  }
}

export default Comida;
