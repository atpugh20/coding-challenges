// HOME PAGE CANVAS //

// CANVAS SETUP //
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
var cW = (canvas.width = window.innerWidth);
var cH = (canvas.height = window.innerHeight);
const cColor = (canvas.style.backgroundColor = "black");

// GLOBALS //

var stars = [];
var asteroids = [];
var boostParticles = [];
var otherShips = [];
var ship = new Ship(cW, cH / 2, 1);
const fps = 60;
const starCount = cW;

// MAIN //

window.addEventListener("load", setup);
// resizing the window will reload the canvas to match new dimensions
window.addEventListener("resize", () => {
  if (window.innerWidth != cW) {
    resetup();
  }
});
// repeats the draw function at the set FPS
setInterval(draw, 1000 / fps);

// FUNCTIONS //

function draw() {
  clearCanvas();
  for (let star of stars) {
    star.updatePosition();
    star.draw(ctx);
  }
  for (let asteroid of asteroids) {
    asteroid.update();
    asteroid.draw(ctx);
  }
  for (let ship of otherShips) {
    ship.update();
    ship.draw(ctx);
  }
  for (let boost of boostParticles) {
    boost.update(cW);
    boost.draw(ctx);
  }
  ship.float();
  ship.draw(ctx);
}

function setup() {
  addStars();
  addAsteroids();
  addBoost();
  addOtherShips();
}

// adds stars at random positions and distances
function addStars() {
  for (let i = 0; i < starCount; i++) {
    stars.push(new Star(rand(cW), rand(cH), getDistance()));
  }
}

// 1/100 chance to spawn an asteroid until there are 15 total
function addAsteroids() {
  for (let i = 0; i < 10; i++) {
    asteroids.push(new Asteroid(rand(cW), rand(cH), getDistance()));
  }
}

// add boost until it has reached the end of the screen
function addBoost() {
  for (let i = 0; i < cW; i++) {
    boostParticles.push(new Boost(ship.pos.x + 80 + i, ship.pos.y - 1));
  }
}

function addOtherShips() {
  for (let i = 0; i < 10; i++) {
    otherShips.push(new OtherShip(rand(1000) * -1, rand(cH), getDistance()));
  }
}

// shortens the process of getting a random distance
function getDistance() {
  return rand(9) + 1;
}

// shortens the process of getting a random number
function rand(n) {
  return Math.floor(Math.random() * n);
}

function resetup() {
  stars = [];
  asteroids = [];
  boostParticles = [];
  otherShips = [];
  cW = canvas.width = window.innerWidth;
  cH = canvas.height = window.innerHeight;
  ship = new Ship(cW, cH / 2, 1);
  setup();
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = cColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
