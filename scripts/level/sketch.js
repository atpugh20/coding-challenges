// CANVAS SETUP //

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const cW = (canvas.width = window.innerWidth);
const cH = (canvas.height = window.innerHeight);
canvas.style.backgroundColor = "black";

// GLOBALS //

const unitSize = 5;
const scale = 30;
const startHeight = 10;
const fps = 30;
const cols = cW / unitSize;
const rows = cH / unitSize;
var grid = [];
const player = new Player();

// MAIN //
setup();
setInterval(draw, 1000 / fps);
window.addEventListener("keydown", (e) => {
  if (e.key == "a") player.vel.x += -1;
  if (e.key == "d") player.vel.x += 1;
  if (e.key == " ") {
    if (!player.falling) player.vel.y -= 4;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.key == "a" || e.key == "d") player.vel.x = 0;
});

// FUNCTIONS //

function draw() {
  clearCanvas();
  drawWalls();
  player.update(grid);
  player.draw();
}

function generateMap() {
  carveTunnels();
  carveStart();
}

function drawWalls() {
  for (let row of grid) {
    for (let cell of row) {
      ctx.fillStyle = cell.isWall
        ? `hsl(${cell.y / 20 + 100},50%,50%)`
        : "black";
      ctx.fillRect(cell.x, cell.y, unitSize, unitSize);
    }
  }
}

function carveTunnels() {
  for (let row of grid) {
    for (let cell of row) {
      const noise = perlin.get(cell.x / scale, cell.y / scale);
      if (noise > 0) cell.isWall = true;
    }
  }
}

function carveStart() {
  for (let row of grid) {
    for (let cell of row) {
      if (cell.y < startHeight * unitSize) cell.isWall = false;
    }
  }
}

function setup() {
  for (let y = 0; y < rows; y++) {
    var row = [];
    for (let x = 0; x < cols; x++) {
      row.push({ x: x * unitSize, y: y * unitSize, isWall: false });
    }
    grid.push(row);
  }
  generateMap();
}

function rand(num) {
  return Math.floor(Math.random() * num);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
