/* CANVAS SETUP */

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const cW = (canvas.width = window.innerWidth);
const cH = (canvas.height = window.innerHeight);
canvas.style.backgroundColor = "black";

/* GLOBALS */

const particle1 = new Particle(cW / 2, cH / 2, 5, "red");

/* MAIN */

draw();

/* FUNCTIONS */

function draw() {
  clearCanvas();
  particle1.draw(ctx);
}

function setup() {}

// Shorthands the process of getting a random number
function rand(num) {
  return Math.floor(Math.random() * num);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
