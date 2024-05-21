const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const sandColorSelector = document.getElementById("sand-color");

const sL = 400; // Side Length
const particleSize = 5;
const numberOfSquares = sL / particleSize;
const FPS = 240;
const gravity = 0.1;
var colorCode = (sandColorSelector.value = 47);

canvas.width = sL;
canvas.height = sL;
const grid = createGrid();
const cursor = new Cursor(-50, -50, particleSize, colorCode);
var interval;

var sandColors = getSandColor(colorCode);

// MAIN

["mousemove", "touchmove"].forEach((event) => {
  window.addEventListener(event, (e) => {
    trackMouse(e);
  });
});

["mousedown", "touchstart"].forEach((event) => {
  window.addEventListener(event, (e) => {
    clearInterval(interval);
    interval = setInterval(createSand, 1000 / FPS);
  });
});

["mouseup", "touchend"].forEach((event) => {
  window.addEventListener(event, () => {
    clearInterval(interval);
  });
});
sandColorSelector.addEventListener("input", (e) => {
  sandColors = getSandColor(Number(e.target.value));
  cursor.colors = sandColors;
});

setInterval(draw, 1000 / FPS);

// FUNCTIONS

function draw(frame) {
  clearCanvas();
  cursor.draw(ctx);
  updateSand(grid);
  drawParticle(grid);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Draws singlular particle to grid (Designed for multiple substances)
function drawParticle(grid) {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const cell = grid[row][col];
      if (cell.isSand) {
        ctx.fillStyle = cell.color;
        ctx.fillRect(cell.x, cell.y, particleSize, particleSize);
      }
    }
  }
}

// Handles sand specifically
function createSand() {
  if (cursor.x >= 0 && cursor.x < sL && cursor.y >= 0 && cursor.y < sL) {
    // Choses random point one square away
    const randX = Math.floor(Math.random() * 3 - 1);
    const randY = Math.floor(Math.random() * 3 - 1);
    var sX = Math.floor(cursor.x / particleSize) + randX;
    var sY = Math.floor(cursor.y / particleSize) + randY;
    // Check for borders
    sX += sX < 0 ? 1 : 0;
    sX -= sX > numberOfSquares - 1 ? 1 : 0;
    sY += sY < 0 ? 1 : 0;
    sY -= sY > numberOfSquares - 1 ? 1 : 0;
    grid[sY][sX].isSand = true;
    grid[sY][sX].color =
      sandColors[Math.floor(Math.random() * sandColors.length)];
  }
}

// Sand dropping
function updateSand(grid) {
  for (let row = grid.length - 2; row >= 0; row--) {
    for (let col = 0; col < grid[row].length; col++) {
      let current = grid[row][col];
      let below = grid[row + 1][col];
      let belowL = grid[row + 1][col - 1];
      let belowR = grid[row + 1][col + 1];

      if (current.isSand) {
        if (below && !below.isSand) {
          below.isSand = true;
          below.color = current.color;
          current.isSand = false;
          current.color = null;
        } else if (belowL && belowR && !belowL.isSand && !belowR.isSand) {
          const rand = Math.floor(Math.random() * 2);
          if (rand == 0) {
            belowL.isSand = true;
            belowL.color = current.color;
          } else {
            belowR.isSand = true;
            belowR.color = current.color;
          }
          current.isSand = false;
          current.color = null;
        } else if (belowL && !belowL.isSand) {
          belowL.isSand = true;
          belowL.color = current.color;
          current.isSand = false;
          current.color = null;
        } else if (belowR && !belowR.isSand) {
          belowR.isSand = true;
          belowR.color = current.color;
          current.isSand = false;
          current.color = null;
        }
      }
    }
  }
}

function getSandColor(colorCode) {
  return [
    `hsl(${colorCode}, 100%, 40%)`,
    `hsl(${colorCode}, 100%, 70%)`,
    `hsl(${colorCode}, 100%, 60%)`,
    `hsl(${colorCode}, 100%, 50%)`,
  ];
}

function createGrid() {
  const cols = Math.floor(canvas.width / particleSize);
  const rows = Math.floor(canvas.height / particleSize);
  const grid = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push({
        x: j * particleSize,
        y: i * particleSize,
        isSand: false,
        color: null,
        vel: 1,
      });
    }
    grid.push(row);
  }
  return grid;
}

function trackMouse(e) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  cursor.x = mouseX;
  cursor.y = mouseY;
}
