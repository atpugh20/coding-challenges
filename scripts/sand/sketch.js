// CANVAS SETUP //

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const sandColorSelector = document.getElementById("sand-color");
const sL = window.innerWidth < 600 ? 350 : 600; // Canvas Dimensions - mobile: 350px, larger: 600px
canvas.width = canvas.height = sL;

// GLOBALS //

const particleSize = 5;
const numberOfSquares = sL / particleSize;
const FPS = 60;
const gravity = 0.1;
var colorCode = (sandColorSelector.value = 47);
const grid = createGrid();
const cursor = new Cursor(-50, -50, particleSize, colorCode);
var interval;
var sandColors = getSandColor(colorCode);

// MAIN //

// adds event listener for when the movement of mouse / finger
["mousemove", "touchmove"].forEach((event) => {
  window.addEventListener(event, (e) => {
    trackMouse(e);
  });
});

// adds event listener for when the user starts a left click / touch
["mousedown", "touchstart"].forEach((event) => {
  window.addEventListener(event, (e) => {
    clearInterval(interval);
    interval = setInterval(createSand, 1000 / FPS);
  });
});

// event listener for when the user releases left click / touch
["mouseup", "touchend"].forEach((event) => {
  window.addEventListener(event, () => {
    clearInterval(interval);
  });
});

// changes the sand color based on the html selector
sandColorSelector.addEventListener("input", (e) => {
  sandColors = getSandColor(Number(e.target.value));
  cursor.colors = sandColors;
});

setInterval(draw, 1000 / FPS);

// FUNCTIONS //

// draws the cursor and particles to the screen
function draw() {
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

// draws singlular particle to grid (Designed for multiple substances)
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

// handles sand creation specifically
function createSand() {
  if (cursor.x >= 0 && cursor.x < sL && cursor.y >= 0 && cursor.y < sL) {
    // choses random point one square away
    const randX = Math.floor(Math.random() * 3 - 1);
    const randY = Math.floor(Math.random() * 3 - 1);
    var sX = Math.floor(cursor.x / particleSize) + randX;
    var sY = Math.floor(cursor.y / particleSize) + randY;
    // check for borders
    sX += sX < 0 ? 1 : 0;
    sX -= sX > numberOfSquares - 1 ? 1 : 0;
    sY += sY < 0 ? 1 : 0;
    sY -= sY > numberOfSquares - 1 ? 1 : 0;
    grid[sY][sX].isSand = true;
    grid[sY][sX].color =
      sandColors[Math.floor(Math.random() * sandColors.length)];
  }
}

// updates the position of the sand
// creates the falling effect
function updateSand(grid) {
  for (let row = grid.length - 2; row >= 0; row--) {
    for (let col = 0; col < grid[row].length; col++) {
      let current = grid[row][col];
      let below = grid[row + 1][col];
      let belowL = grid[row + 1][col - 1];
      let belowR = grid[row + 1][col + 1];

      if (current.isSand) {
        // if no sand below, drop one
        if (below && !below.isSand) {
          below.isSand = true;
          below.color = current.color;
          current.isSand = false;
          current.color = null;
        }
        // if sand below, check below left and right, creates the slide effect
        else if (belowL && belowR && !belowL.isSand && !belowR.isSand) {
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

// gets the current sand color from the html selector
// multiple colors give grainy effect
function getSandColor(colorCode) {
  return [
    `hsl(${colorCode}, 100%, 40%)`,
    `hsl(${colorCode}, 100%, 70%)`,
    `hsl(${colorCode}, 100%, 60%)`,
    `hsl(${colorCode}, 100%, 50%)`,
  ];
}

// creates the grid that keeps track of the particle positions
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

// tracks the position of the mouse or finger
function trackMouse(e) {
  const rect = canvas.getBoundingClientRect();
  let mouseX;
  let mouseY;
  if (e.changedTouches) {
    mouseX = e.changedTouches[0].clientX - rect.left;
    mouseY = e.changedTouches[0].clientY - rect.top;
  } else {
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  }
  cursor.x = mouseX;
  cursor.y = mouseY;
}
