class Comida {
  constructor() {
    this.posicion = null;
    // Colores fijos para cada tipo de fruta
    this.colores = {
      manzana: "#ff0000", // Rojo para la manzana
      banana: "#ffe135", // Amarillo para la banana
      uva: "#800080", // Morado para las uvas
    };
    this.tipoFruta = ["manzana", "banana", "uva"];
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
    const tipo =
      this.tipoFruta[Math.floor(Math.random() * this.tipoFruta.length)]; // Elegir un tipo de fruta aleatoriamente
    this.posicion = {
      x: x,
      y: y,
      tipo: tipo,
      color: this.colores[tipo], // Asignar color según el tipo de fruta
    };
  }

  dibujar(ctx, tamanoCeldaX, tamanoCeldaY) {
    if (this.posicion) {
      ctx.fillStyle = this.posicion.color;

      // Dibujar la fruta según el tipo
      switch (this.posicion.tipo) {
        case "manzana":
          // Dibujar una manzana (círculo)
          ctx.beginPath();
          ctx.arc(
            this.posicion.x * tamanoCeldaX + tamanoCeldaX / 2,
            this.posicion.y * tamanoCeldaY + tamanoCeldaY / 2,
            tamanoCeldaX / 2.5, // Radio
            0,
            2 * Math.PI
          );
          ctx.fill();
          break;
        case "banana":
          // Dibujar una banana pequeña (forma curva ocupando dos casillas)
          ctx.beginPath();
          ctx.ellipse(
            this.posicion.x * tamanoCeldaX + tamanoCeldaX / 2, // Ajuste de la posición
            this.posicion.y * tamanoCeldaY + tamanoCeldaY / 2, // Ajuste de la posición
            tamanoCeldaX / 2, // Ancho de la elipse (ocupa dos casillas)
            tamanoCeldaY / 3.5, // Alto de la elipse (más pequeña)
            Math.PI / 4,
            0,
            2 * Math.PI
          );
          ctx.fill();
          break;
        case "uva":
          // Dibujar una uva (varios círculos pequeños)
          ctx.beginPath();
          ctx.arc(
            this.posicion.x * tamanoCeldaX + tamanoCeldaX / 3,
            this.posicion.y * tamanoCeldaY + tamanoCeldaY / 3,
            tamanoCeldaX / 4, // Radio
            0,
            2 * Math.PI
          );
          ctx.arc(
            this.posicion.x * tamanoCeldaX + (2 * tamanoCeldaX) / 3,
            this.posicion.y * tamanoCeldaY + tamanoCeldaY / 3,
            tamanoCeldaX / 4, // Radio
            0,
            2 * Math.PI
          );
          ctx.arc(
            this.posicion.x * tamanoCeldaX + tamanoCeldaX / 2,
            this.posicion.y * tamanoCeldaY + (2 * tamanoCeldaY) / 3,
            tamanoCeldaX / 4, // Radio
            0,
            2 * Math.PI
          );
          ctx.fill();
          break;
        default:
          // Si no hay tipo definido, dibujar un rectángulo
          ctx.fillRect(
            this.posicion.x * tamanoCeldaX,
            this.posicion.y * tamanoCeldaY,
            tamanoCeldaX,
            tamanoCeldaY
          );
      }
    }
  }
}

export default Comida;
