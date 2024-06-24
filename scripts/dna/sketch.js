/* CANVAS SETUP */

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const cW = (canvas.width = window.innerWidth);
const cH = (canvas.height = window.innerHeight);
canvas.style.backgroundColor = "black";

/* GLOBALS */

const fps = 60;
const strand1 = [];
const strand2 = [];

/* MAIN */

setup();
setInterval(draw, 1000 / fps);

/* FUNCTIONS */

function draw() {
  for (let particle of strand1) {
    particle.draw(ctx);
  }
}

function setup() {
  for (let x = 0; x < cW; x += 1) {
    strand1.push(new Particle(x, Math.sin(x) * 40 + cH / 2, 5, "red"));
  }
}

// Shorthands the process of getting a random number
function rand(num) {
  return Math.floor(Math.random() * num);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
