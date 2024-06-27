/* CANVAS SETUP */

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
var cW = (canvas.width = window.innerWidth - 20);
const cH = (canvas.height = 240); // canavs height of 240 produces the best visual results for the color of the DNA strands
canvas.style.backgroundColor = "black";

/* HTML SELECTORS */

const hue1Selector = document.getElementById("hue1");
const hue2Selector = document.getElementById("hue2");
const sizeSelector = document.getElementById("size");
const heightSelector = document.getElementById("height");
const rateSelector = document.getElementById("rate");
const hue1Num = document.getElementById("hue1-num");
const hue2Num = document.getElementById("hue2-num");
const sizeNum = document.getElementById("size-num");
const heightNum = document.getElementById("height-num");
const rateNum = document.getElementById("rate-num");
const resetButton = document.getElementById("reset-button");

/* GLOBALS */

const fps = 60;
var hue1;
var hue2;
var size;
var crestRate;
var waveHeight;
var strand1 = [];
var strand2 = [];

/* MAIN */

resetSettings();
window.addEventListener("input", updateSettings);
window.addEventListener("resize", resizeCanvas);
resetButton.addEventListener("click", resetSettings);
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
}

// Initializes each particle in the strands
function setup() {
  for (let x = -15; x < cW + 15; x += 15) {
    strand1.push(new Particle(x, 0, 0, size, hue1));
    strand2.push(new Particle(x, 0, 0, size, hue2));
  }
}

// Updates the strands and the slider numbers with the changed inputs
function updateSettings() {
  updateStrands();
  updateSettingsTab();
  setup();
}

// Applies changes of the HTML sliders to the strands and particles
function updateStrands() {
  strand1 = [];
  strand2 = [];
  hue1 = hue1Selector.value;
  hue2 = hue2Selector.value;
  size = sizeSelector.value;
  crestRate = rateSelector.value;
  waveHeight = heightSelector.value;
}

// Applies the changes of the HTML sliders to the slider numbers
function updateSettingsTab() {
  hue1Num.innerHTML = hue1;
  hue2Num.innerHTML = hue2;
  sizeNum.innerHTML = size;
  heightNum.innerHTML = waveHeight;
  rateNum.innerHTML = crestRate;
}

// Resets all HTML selectors to default, then calls updateSettings()
function resetSettings() {
  hue1Selector.value = 0;
  hue2Selector.value = 220;
  sizeSelector.value = 5;
  if (cW < 800) {
    rateSelector.value = 0.025;
    heightSelector.value = 60;
  } else {
    rateSelector.value = 0.015;
    heightSelector.value = 100;
  }
  updateSettings();
}

function resizeCanvas() {
  if (window.innerWidth != cW) {
    cW = canvas.width = window.innerWidth - 20;
    resetSettings();
  }
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
