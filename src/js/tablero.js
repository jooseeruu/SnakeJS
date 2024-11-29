class Tablero {
  constructor(canvas, columnas, filas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.columnas = columnas;
    this.filas = filas;
    this.tamanoCeldaX = canvas.width / columnas;
    this.tamanoCeldaY = canvas.height / filas;
    this.tablero = Array.from({ length: filas }, () => Array(columnas).fill(0));
  }

  dibujar() {
    for (let y = 0; y < this.filas; y++) {
      for (let x = 0; x < this.columnas; x++) {
        let color = (x + y) % 2 === 0 ? "#1b263b" : "#2b2d42";
        this.ctx.fillStyle = color;
        this.ctx.fillRect(
          x * this.tamanoCeldaX,
          y * this.tamanoCeldaY,
          this.tamanoCeldaX,
          this.tamanoCeldaY
        );

        this.ctx.strokeStyle = "#444";
        this.ctx.strokeRect(
          x * this.tamanoCeldaX,
          y * this.tamanoCeldaY,
          this.tamanoCeldaX,
          this.tamanoCeldaY
        );
      }
    }
  }

  quitarComida(x, y) {
    this.tablero[y][x] = 0;
  }
}

export default Tablero;
