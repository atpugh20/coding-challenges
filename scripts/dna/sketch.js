/* CANVAS SETUP */

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const cW = (canvas.width = window.innerWidth);
const cH = (canvas.height = window.innerHeight);
canvas.style.backgroundColor = "black";

/* GLOBALS */

const fps = 60;
const crestRate = 0.01;
const waveHeight = 50;
const strand1 = [];
const strand2 = [];

/* MAIN */

setup();
setInterval(draw, 1000 / fps);

/* FUNCTIONS */

function draw() {
  clearCanvas();
  for (let particle of strand1) {
    particle.draw(ctx);
    particle.updateSin();
  }
  for (let particle of strand2) {
    particle.draw(ctx);
    particle.updateCos();
  }
  console.log(strand1[0].pos.x);
}

function setup() {
  for (let x = -50; x < cW + 50; x++) {
    strand1.push(
      new Particle(x, Math.sin(x * crestRate) * waveHeight + cH / 2, 5, "red")
    );
    strand2.push(
      new Particle(x, Math.cos(x * crestRate) * waveHeight + cH / 2, 5, "blue")
    );
  }
}

function drawWave(strand) {}

// Shorthands the process of getting a random number
function rand(num) {
  return Math.floor(Math.random() * num);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
