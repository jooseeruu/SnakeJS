class Serpiente {
  constructor() {
    this.cuerpo = [{ x: 5, y: 5 }];
    this.direccion = { x: 0, y: 0 };
    this.longitud = 1;
  }

  mover() {
    const nuevaCabeza = {
      x: this.cuerpo[0].x + this.direccion.x,
      y: this.cuerpo[0].y + this.direccion.y,
    };

    this.cuerpo.unshift(nuevaCabeza);

    if (this.cuerpo.length > this.longitud) {
      this.cuerpo.pop();
    }
  }

  chequearColision(tablero) {
    const cabeza = this.cuerpo[0];

    // Colisión con el borde
    if (
      cabeza.x < 0 ||
      cabeza.x >= tablero.columnas ||
      cabeza.y < 0 ||
      cabeza.y >= tablero.filas
    ) {
      return true;
    }

    // Colisión con el cuerpo
    for (let i = 1; i < this.cuerpo.length; i++) {
      if (this.cuerpo[i].x === cabeza.x && this.cuerpo[i].y === cabeza.y) {
        return true;
      }
    }

    return false;
  }

  dibujar(ctx, tamanoCeldaX, tamanoCeldaY) {
    this.cuerpo.forEach((segmento) => {
      ctx.fillStyle = "#4cc9f0";
      ctx.fillRect(
        segmento.x * tamanoCeldaX,
        segmento.y * tamanoCeldaY,
        tamanoCeldaX,
        tamanoCeldaY
      );
    });
  }

  crece() {
    this.longitud++;
  }
}

export default Serpiente;
