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

  colocarComida(x, y) {
    this.tablero[y][x] = 2;
  }

  quitarComida(x, y) {
    this.tablero[y][x] = 0;
  }
}

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

    // Colisión con el cuerpo
    for (let i = 1; i < this.cuerpo.length; i++) {
      if (this.cuerpo[i].x === cabeza.x && this.cuerpo[i].y === cabeza.y) {
        return true;
      }
    }

    // Colisión con los bordes
    if (
      cabeza.x < 0 ||
      cabeza.x >= tablero.columnas ||
      cabeza.y < 0 ||
      cabeza.y >= tablero.filas
    ) {
      return true;
    }

    return false;
  }

  crece() {
    this.longitud++;
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
}

class Comida {
  constructor(coloresFrutas) {
    this.coloresFrutas = coloresFrutas;
    this.posicion = null;
  }

  generar(tablero) {
    let x, y;
    do {
      x = Math.floor(Math.random() * tablero.columnas);
      y = Math.floor(Math.random() * tablero.filas);
    } while (tablero.tablero[y][x] === 1); // Evitar que la comida se genere sobre la serpiente

    this.posicion = {
      x,
      y,
      color:
        this.coloresFrutas[
          Math.floor(Math.random() * this.coloresFrutas.length)
        ],
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

const canvas = document.getElementById("Caja");
const tablero = new Tablero(canvas, 12, 11);
const serpiente = new Serpiente();
const comida = new Comida(["#ff0000", "#ffa500", "#ffff00", "#008000"]);

let juegoActivo = true;

function finDeJuego() {
  juegoActivo = false;
  alert("¡Juego terminado!");
}

document.addEventListener("keydown", (event) => {
  if (event.key === "a" || event.key === "A") {
    if (serpiente.direccion.x === 0) serpiente.direccion = { x: -1, y: 0 }; // Izquierda
  }
  if (event.key === "w" || event.key === "W") {
    if (serpiente.direccion.y === 0) serpiente.direccion = { x: 0, y: -1 }; // Arriba
  }
  if (event.key === "d" || event.key === "D") {
    if (serpiente.direccion.x === 0) serpiente.direccion = { x: 1, y: 0 }; // Derecha
  }
  if (event.key === "s" || event.key === "S") {
    if (serpiente.direccion.y === 0) serpiente.direccion = { x: 0, y: 1 }; // Abajo
  }
});

function jugar() {
  if (!juegoActivo) return;

  tablero.dibujar();
  serpiente.mover();

  // Chequeamos colisión
  if (serpiente.chequearColision(tablero)) {
    finDeJuego();
    return;
  }

  // Comprobar si la serpiente ha comido la fruta
  const cabeza = serpiente.cuerpo[0];
  if (cabeza.x === comida.posicion.x && cabeza.y === comida.posicion.y) {
    tablero.quitarComida(cabeza.x, cabeza.y);
    comida.generar(tablero);
    serpiente.crece();
  }

  serpiente.dibujar(tablero.ctx, tablero.tamanoCeldaX, tablero.tamanoCeldaY);
  comida.dibujar(tablero.ctx, tablero.tamanoCeldaX, tablero.tamanoCeldaY);
}

function gameLoop() {
  jugar();
  if (juegoActivo) {
    setTimeout(gameLoop, 110);
  }
}

// Iniciar el juego
comida.generar(tablero); // Generar la primera comida
gameLoop();
