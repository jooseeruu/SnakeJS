import Tablero from "./tablero.js";
import Serpiente from "./serpiente.js";
import Comida from "./comida.js";

const canvas = document.getElementById("Caja");
const ctx = canvas.getContext("2d");

const tablero = new Tablero(canvas, 15, 14);
const serpiente = new Serpiente(); // Instanciamos la serpiente sin color base todavía
const comida = new Comida(["#ff0000", "#ffa500", "#ffff00", "#008000"]);

// Obtener el input de color desde el HTML
const colorPicker = document.getElementById("colorPicker");

// Función para convertir color hex a RGB
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

// Cambiar el color base de la serpiente cuando el usuario selecciona un nuevo color
colorPicker.addEventListener("input", (event) => {
  const colorHex = event.target.value;
  const colorRGB = hexToRgb(colorHex); // Convertir el color de Hex a RGB
  serpiente.colorBase = colorRGB; // Actualizar el color base de la serpiente
});

let juegoActivo = true;

// Fin del juego
function finDeJuego() {
  juegoActivo = false;
  alert("¡Juego terminado!");
  window.location.reload(); // Recargar la página para reiniciar el juego
}

// Manejo de eventos de teclas
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

// Función principal del juego
function jugar() {
  if (!juegoActivo) return;

  // Primero, dibujar el tablero
  tablero.dibujar();

  // Mover la serpiente
  serpiente.mover();

  // Chequear si la serpiente ha colisionado con el borde o con su cuerpo
  if (serpiente.chequearColision(tablero)) {
    finDeJuego();
    return;
  }

  // Comprobar si la serpiente ha comido la fruta
  const cabeza = serpiente.cuerpo[0];
  if (cabeza.x === comida.posicion.x && cabeza.y === comida.posicion.y) {
    tablero.quitarComida(cabeza.x, cabeza.y); // Limpiar la comida del tablero
    comida.generar(tablero); // Generar una nueva comida
    serpiente.crece(); // Incrementar el tamaño de la serpiente
  }

  // Dibujar la serpiente y la comida
  serpiente.dibujar(ctx, tablero.tamanoCeldaX, tablero.tamanoCeldaY);
  comida.dibujar(ctx, tablero.tamanoCeldaX, tablero.tamanoCeldaY);

  setTimeout(jugar, 110); // Controla la velocidad del juego
}

// Iniciar el juego
comida.generar(tablero); // Generar la primera comida
jugar();
