// CANVAS SETUP //

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const cW = (canvas.width = window.innerWidth);
const cH = (canvas.height = window.innerHeight);
canvas.style.backgroundColor = "black";

// GLOBALS //

const unitSize = 5;
const scale = 50;
const cols = cW / unitSize;
const rows = cH / unitSize;
var grid = [];

// MAIN //
setup();
draw();

// FUNCTIONS //

function draw() {
  for (let row of grid) {
    for (let cell of row) {
      ctx.fillStyle = getColor(cell.x, cell.y);
      ctx.fillRect(
        cell.x,
        cell.y,
        unitSize * rand(unitSize),
        unitSize * rand(unitSize)
      );
    }
  }
}

function setup() {
  for (let y = 0; y < rows; y++) {
    var row = [];
    for (let x = 0; x < cols; x++) {
      row.push({ x: x * unitSize, y: y * unitSize });
    }
    grid.push(row);
  }
}

function getColor(x, y) {
  const noise = perlin.get(x / scale, y / scale);
  const color = noise > 0 ? "black" : "white";
  return color;
}

function rand(num) {
  return Math.floor(Math.random() * num);
}
