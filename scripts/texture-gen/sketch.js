//// PERLIN NOISE TEXTURE GENERATOR ////
//// Draws a low-resolution texture to the canvas using perlin noise ////

// CANVAS SETUP //

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const cL = window.innerWidth < 600 ? 350 : 600; // Canvas Dimensions - mobile: 350px, larger: 600px
canvas.width = canvas.height = cL;

// HTML SELECTORS //

const colorSelector = document.getElementById("color");
const saturationSelector = document.getElementById("saturation");
const squareSizeSelector = document.getElementById("square");
const saturationNum = document.getElementById("saturation-num");
const squareSizeNum = document.getElementById("square-num");

// GLOBALS //

var color;
var saturation;
var squareSize = 1;
const offInterval = 0.05;
let xOff = 0;
let yOff = 10000;

// MAIN //

// intial load and draw
window.addEventListener("load", () => {
  getDefaultValues();
  draw();
});

// changes drawing based on the html selectors
window.addEventListener("input", () => {
  updateValues();
  draw();
});

// FUNCTIONS //

// uses perlin noise to draw altering colors to the canvas
function draw() {
  for (let y = 0; y < cL; y += squareSize) {
    yOff += offInterval;
    for (let x = 0; x < cL; x += squareSize) {
      xOff += offInterval;
      const noiseValue = (perlin.get(xOff, yOff) / 2 + 0.5) * 100;
      ctx.fillStyle = `hsl(${color}, ${saturation}%, ${noiseValue}%)`;
      ctx.fillRect(x, y, squareSize, squareSize);
    }
    xOff = 0;
  }
  yOff = 0;
}
S;
// resets the html selectors to default values
function getDefaultValues() {
  color = colorSelector.value = 135;
  saturation = saturationSelector.value = 50;
  squareSize = squareSizeSelector.value = 5;
  saturationNum.innerHTML = saturation;
  squareSizeNum.innerHTML = squareSize;
}

// updates the canvas with the changed html selector values
function updateValues() {
  color = colorSelector.value;
  saturation = Number(saturationSelector.value);
  squareSize = Number(squareSizeSelector.value);
  saturationNum.innerHTML = saturation;
  squareSizeNum.innerHTML = squareSize;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
