/* CANVAS SETUP */

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const cW = (canvas.width = window.innerWidth - 20);
const cH = (canvas.height = 240);
canvas.style.backgroundColor = "black";

/* GLOBALS */

const fps = 60;
const crestRate = 0.01;
const waveHeight = 100;
var strand1 = [];
var strand2 = [];

/* MAIN */

setup();
setInterval(draw, 1000 / fps);

/* FUNCTIONS */

function draw() {
  clearCanvas();
  for (let i = 0; i < strand1.length; i++) {
    strand1[i].updatePos1();
    strand2[i].updatePos2();
    if (strand1[i].pos.z > strand2[i].pos.z) {
      strand2[i].draw(ctx);
      strand1[i].draw(ctx);
    } else {
      strand1[i].draw(ctx);
      strand2[i].draw(ctx);
    }
  }
  console.log(cH);
}

function setup() {
  for (let x = -50; x < cW + 50; x += 15) {
    strand1.push(new Particle(x, 0, 0, 5, 0));
    strand2.push(new Particle(x, 0, 0, 5, 220));
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
