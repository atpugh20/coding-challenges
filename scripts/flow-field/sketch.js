// CANVAS SETUP //

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const cL = window.innerWidth < 500 ? 300 : 400; // Canvas Dimensions - mobile: 300px, larger: 400px
canvas.width = canvas.height = cL;
canvas.style.backgroundColor = "black";

// DOM SELECTORS //

const colorSelectors = document.getElementsByClassName("color");
const sizeSelector = document.getElementById("size");
const numSelector = document.getElementById("num");
const magSelector = document.getElementById("magnitude");
const scaleSelector = document.getElementById("scale");
const alphaSelector = document.getElementById("alpha");
const sizeNum = document.getElementById("size-num");
const numNum = document.getElementById("num-num");
const magNum = document.getElementById("magnitude-num");
const scaleNum = document.getElementById("scale-num");
const alphaNum = document.getElementById("alpha-num");

// GLOBALS //

var vectors = [];
var particles = [];
var flowField = [];
var xOff = 0; // For the noise function
var yOff = 10000;
ctx.globalAlpha = 0.1;
var scale = 2; // has to be the smallest value on window load
var mag = 0.5;
var particleNum = 2000;
var particleSize = 1;
var colors = [
  colorSelectors[0].value,
  colorSelectors[1].value,
  colorSelectors[2].value,
];
const squareNum = Math.floor(cL / scale);

// MAIN //

// first load of program
window.addEventListener("load", () => {
  resetValues();
  updateValues();
  setup();
});

// updates the canvas when sliders change
window.addEventListener("input", () => {
  updateValues();
  restartDraw();
});

setInterval(draw, 33.33);

// FUNCTIONS //

// draws and updates the particles on the screen
function draw() {
  // clearCanvas();
  for (let particle of particles) {
    particle.follow(flowField, squareNum, scale);
    particle.show(ctx);
    particle.edge();
  }
}

// initializes the vectors and and particles
function setup() {
  yOff = 0;
  for (let y = 0; y <= squareNum; y++) {
    yOff += 0.037;
    xOff = 0;
    for (let x = 0; x <= squareNum; x++) {
      xOff += 0.036;
      // noise is calculated in the vector class
      const newVector = new Vector(x * scale, y * scale, scale, xOff, yOff);
      vectors.push(newVector);
      const index = x + y * squareNum;
      flowField[index] = newVector;
    }
  }
  for (let i = 0; i < particleNum; i++) {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    particles.push(new Particle(cL, randomColor, mag, particleSize));
  }
}

// updates the canvas with the html slider values
function updateValues() {
  colors = [
    colorSelectors[0].value,
    colorSelectors[1].value,
    colorSelectors[2].value,
  ];
  particleSize = Number(sizeSelector.value);
  particleNum = Number(numSelector.value);
  mag = Number(magSelector.value);
  scale = Number(scaleSelector.value);
  ctx.globalAlpha = Number(alphaSelector.value);
  // displays current values in the tab under the canvas
  sizeNum.innerHTML = particleSize;
  numNum.innerHTML = particleNum;
  magNum.innerHTML = mag;
  scaleNum.innerHTML = scale;
  alphaNum.innerHTML = Math.round(ctx.globalAlpha * 100) / 100;
}

// resets the html sliders and values
function resetValues() {
  colorSelectors[0].value = "#0FFF50";
  colorSelectors[1].value = "#000000";
  colorSelectors[2].value = "#000000";
  sizeSelector.value = 1;
  numSelector.value = 2000;
  magSelector.value = 0.5;
  scaleSelector.value = 10;
  alphaSelector.value = 0.1;
}

// restarts current draw from beginning
function restartDraw() {
  vectors = [];
  particles = [];
  flowField = [];
  clearCanvas();
  setup();
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
