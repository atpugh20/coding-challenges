const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const cL = window.innerWidth < 500 ? 300 : 400; // Canvas Dimensions
canvas.width = canvas.height = cL;

const colorSelector = document.getElementById("color");
const saturationSelector = document.getElementById("saturation");
const squareSizeSelector = document.getElementById("square");
const saturationNum = document.getElementById("saturation-num");
const squareSizeNum = document.getElementById("square-num");
var color;
var saturation;
var squareSize;

const offInterval = 0.05;
let xOff = 0;
let yOff = 10000;

window.addEventListener("load", () => {
  getDefaultValues();
  draw();
});

window.addEventListener("input", () => {
  updateValues();
  draw();
});

function draw() {
  clearCanvas();
  fillGrid();
}

function fillGrid() {
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

function getDefaultValues() {
  color = colorSelector.value = 135;
  saturation = saturationSelector.value = 50;
  squareSize = squareSizeSelector.value = 5;
  saturationNum.innerHTML = saturation;
  squareSizeNum.innerHTML = squareSize;
}

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
