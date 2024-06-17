// CANVAS SETUP //

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const cL = window.innerWidth < 600 ? 350 : 600; // Canvas Dimensions - mobile: 350px, larger: 600px
canvas.width = canvas.height = cL;
canvas.style.backgroundColor = "black";

// HTML SELECTORS //

const colorSelectors = document.getElementsByClassName("color");
const sizeSelector = document.getElementById("size");
const numSelector = document.getElementById("num");
const scaleSelector = document.getElementById("scale");

// GLOBALS //

const particles = [];
const particleNum = 500;
const particleSize = 1;
const particleColors = ["#618B4A", "#40531B", "#D7F9F1"];
const fps = 240;
const scale = 250;

// MAIN //

setup();
setInterval(draw, 1000 / fps);

// FUNCTIONS //

function draw() {
  for (let particle of particles) {
    particle.updatePosition();
    particle.show(ctx);
    particle.edge();
  }
}

function setup() {
  for (let i = 0; i < particleNum; i++) {
    particles.push(new Particle(cL, particleSize));
  }
}

function rand(num) {
  return Math.floor(Math.random() * num);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
