class Serpiente {
  constructor(colorBase = { r: 157, g: 12, b: 62 }) {
    this.cuerpo = [{ x: 5, y: 5 }];
    this.direccion = { x: 0, y: 0 };
    this.longitud = 1;
    this.siguienteDireccion = { x: 0, y: 0 };

    // Asignamos el color base recibido en el constructor
    this.colorBase = colorBase;
  }

  // Mueve la serpiente con la dirección actual
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

  // Función para aclarar el color
  aclararColor(color, porcentaje) {
    const factor = 1 + porcentaje / 100;
    return {
      r: Math.min(255, color.r * factor),
      g: Math.min(255, color.g * factor),
      b: Math.min(255, color.b * factor),
    };
  }

  // Convertir un color RGB a formato hexadecimal
  rgbToHex(r, g, b) {
    return `#${((1 << 24) | (r << 16) | (g << 8) | b)
      .toString(16)
      .slice(1)
      .toUpperCase()}`;
  }

  // Dibuja la serpiente con bordes redondeados y colores progresivamente más claros
  dibujar(ctx, tamanoCeldaX, tamanoCeldaY) {
    this.cuerpo.forEach((segmento, index) => {
      // Aclaramos el color según el índice del segmento
      const colorAclarado = this.aclararColor(this.colorBase, index * 5); // Aclara el color un 5% por segmento
      const colorHex = this.rgbToHex(
        colorAclarado.r,
        colorAclarado.g,
        colorAclarado.b
      );

      // Establecemos el color del segmento
      ctx.fillStyle = colorHex;

      // Dibuja cada segmento como un rectángulo con bordes redondeados
      this.dibujarRectanguloRedondeado(
        ctx,
        segmento.x * tamanoCeldaX,
        segmento.y * tamanoCeldaY,
        tamanoCeldaX,
        tamanoCeldaY,
        6 // Radio de los bordes redondeados
      );

      // Agregar sombra para un efecto de profundidad
      ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
      ctx.shadowBlur = 5;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
    });
  }

  // Función para dibujar rectángulos con bordes redondeados
  dibujarRectanguloRedondeado(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();
  }

  // Chequea colisiones y otras funcionalidades
  chequearColision(tablero) {
    const cabeza = this.cuerpo[0];

    if (
      cabeza.x < 0 ||
      cabeza.x >= tablero.columnas ||
      cabeza.y < 0 ||
      cabeza.y >= tablero.filas
    ) {
      return true;
    }

    for (let i = 1; i < this.cuerpo.length; i++) {
      if (this.cuerpo[i].x === cabeza.x && this.cuerpo[i].y === cabeza.y) {
        return true;
      }
    }

    return false;
  }

  crece() {
    this.longitud++;
  }

  cambiarDireccion(direccion) {
    if (this.direccion.x === 0 && direccion.y !== 0) {
      this.siguienteDireccion = direccion;
    } else if (this.direccion.y === 0 && direccion.x !== 0) {
      this.siguienteDireccion = direccion;
    }
  }

  actualizarDireccion() {
    this.direccion = this.siguienteDireccion;
  }
}

export default Serpiente;
