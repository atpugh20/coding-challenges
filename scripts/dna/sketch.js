/* CANVAS SETUP */

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const cW = (canvas.width = window.innerWidth);
const cH = (canvas.height = window.innerHeight);
canvas.style.backgroundColor = "black";

/* GLOBALS */

const fps = 60;
const particle1 = new Particle(cW / 2, cH / 2, 5, "red");
const particle2 = new Particle(cW / 2 + 15, cH / 2, 5, "blue");
const particle3 = new Particle(cW / 2 + 80, cH / 2, 5, "black");

/* MAIN */

setInterval(draw, 1000 / fps);

/* FUNCTIONS */

function draw() {
  particle1.updateCos();
  particle1.draw(ctx);
  particle2.updateSin();
  particle2.draw(ctx);
  particle3.updateCos();
  particle3.draw(ctx);
  ctx.drawImage(canvas, -1, 0, cW, cH);
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
