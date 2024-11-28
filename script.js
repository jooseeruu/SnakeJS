const canvas = document.getElementById("Caja");
const ctx = canvas.getContext("2d");

const columnas = 12; // Número de celdas en el eje X
const filas = 11; // Número de celdas en el eje Y
const tamanoCeldaX = canvas.width / columnas; // 370px / 12 celdas = 30.83px por celda
const tamanoCeldaY = canvas.height / filas; // 330px / 11 celdas = 30px por celda

const tablero = Array.from({ length: filas }, () => Array(columnas).fill(0));

function dibujarTablero() {
  for (let y = 0; y < filas; y++) {
    // Recorre las filas
    for (let x = 0; x < columnas; x++) {
      // Recorre las columnas
      let color = "#333333"; // Color oscuro por defecto de la celda
      ctx.fillStyle = color; // Establece el color de la celda
      ctx.fillRect(
        // Dibuja la celda
        x * tamanoCeldaX,
        y * tamanoCeldaY,
        tamanoCeldaX,
        tamanoCeldaY
      );
      ctx.strokeStyle = "#AAAAAA"; // Establece el color gris del borde de la celda
      ctx.strokeRect(
        // Dibuja el borde de la celda
        x * tamanoCeldaX,
        y * tamanoCeldaY,
        tamanoCeldaX,
        tamanoCeldaY
      );
    }
  }
}

function actualizar() {
  dibujarTablero();
}
actualizar();
