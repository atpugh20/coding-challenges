/* CANVAS SETUP */

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
var cW = (canvas.width = window.innerWidth);
const cH = (canvas.height = window.innerHeight);
canvas.style.backgroundColor = "black";

/* HTML SELECTORS */

/* GLOBALS */
const FPS = 60;
const PARTICLENUM = 5000;
const PARTICLESIZE = 1;
const PLANETSIZE = 5;
var mousePos = {};
var particles = [];
var interval;
var frame = 0;
var planet = new Planet(
  rand(cW - 100) + 50,
  rand(cH - 100) + 50,
  PLANETSIZE,
  randomColor()
);

/* MAIN */

window.addEventListener("resize", resizeCanvas);
setup();
setInterval(draw, 1000 / FPS);

/* FUNCTIONS */

// Initialize particles in random spots with random colors
function setup() {
  for (let i = 0; i < PARTICLENUM; i++) {
    particles.push(
      new Particle(rand(cW), rand(cH), PARTICLESIZE, randomColor())
    );
  }
}

// Draws all particles to screen and updates their positions
function draw() {
  frame++;
  clearCanvas();
  // creates a new planet every 500 frames
  if (frame % 500 == 0) {
    planet = new Planet(
      rand(cW - 100) + 50,
      rand(cH - 100) + 50,
      PLANETSIZE,
      randomColor()
    );
  } else if (frame % 250 == 0) {
    planet = null; // destroys planet every 250 frames (unless being created)
  }
  if (planet) {
    planet.update();
    planet.draw(ctx);
  }
  for (let particle of particles) {
    particle.update();
    particle.draw(ctx);
    if (planet) particle.updateVelocity(planet.pos.x, planet.pos.y);
  }
}

// Shorthands the random color
function randomColor() {
  return `hsl(${rand(360)}, 50%, 50%)`;
}

// Shorthands the random function
function rand(num) {
  return Math.floor(Math.random() * num);
}

// Resizes canvas width with the window
function resizeCanvas() {
  if (window.innerWidth != cW) {
    cW = canvas.width = window.innerWidth;
    particles = [];
    setup();
    draw();
  }
}

// Erases what was drawn on the canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Updates the mouse position according to the canvas
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
  mousePos.x = mouseX;
  mousePos.y = mouseY;
}
