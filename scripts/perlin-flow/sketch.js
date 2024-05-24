// Setup
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const cL = window.innerWidth < 500 ? 300 : 400; // Canvas Dimensions
canvas.width = canvas.height = cL;
canvas.style.backgroundColor = "black";
let xOff = 0;

// Selectors
const colorSelector = document.getElementById("hill-color");
const scaleSelector = document.getElementById("scale");
const brightnessSelector = document.getElementById("brightness");
const widthSelector = document.getElementById("width");
const scaleNum = document.getElementById("scale-num");
const brightnessNum = document.getElementById("brightness-num");
const widthNum = document.getElementById("width-num");

// Globals
const fps = 60;
const offInterval = 0.005;
var hillColor = 100;
var scale = 150;
var lineWidth = 1;
var brightness = 30;

// MAIN

window.addEventListener("load", getDefaultValues);
setInterval(draw, 1000 / fps);
window.addEventListener("input", updateHillValues);

// FUNCTIONS

function draw() {
  drawLine();
  ctx.drawImage(canvas, 0, 1, cL, cL);
}

function drawLine() {
  for (let x = 0; x < cL; x++) {
    const noise = getNoise(x);
    ctx.fillStyle = `hsl(${hillColor}, 100%, ${brightness / noise - 40}%)`;
    ctx.fillRect(x, (cL / 2) * noise, 1, lineWidth);
    ctx.fillStyle = "black";
    ctx.fillRect(x, (cL / 2) * noise, 1, -400);
  }
}

function getNoise(x) {
  xOff += offInterval;
  const intervalX = perlin.get(x / scale, xOff / scale) / 2 + 0.5;
  return intervalX;
}

function updateHillValues() {
  clearCanvas();
  hillColor = colorSelector.value;
  scale = scaleNum.innerHTML = scaleSelector.value;
  brightness = brightnessNum.innerHTML = brightnessSelector.value;
  lineWidth = widthNum.innerHTML = widthSelector.value;
}

function getDefaultValues() {
  colorSelector.value = 100;
  scaleSelector.value = scaleNum.innerHTML = 150;
  brightnessSelector.value = brightnessNum.innerHTML = 30;
  widthSelector.value = widthNum.innerHTML = 1;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
