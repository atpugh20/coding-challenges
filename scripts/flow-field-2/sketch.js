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
const lifeSelector = document.getElementById("life");
const resetButton = document.getElementById("reset-button");
const newSeedButton = document.getElementById("new-seed-button");
const sizeNum = document.getElementById("size-num");
const numNum = document.getElementById("num-num");
const scaleNum = document.getElementById("scale-num");
const lifeNum = document.getElementById("life-num");

// GLOBALS //

const fps = 30;
var particles = [];
var particleNum;
var particleSize;
var particleLife;
var particleColors = [];
var scale;

// MAIN //

resetSettings();
setInterval(draw, 1000 / fps);
window.addEventListener("input", updateSettings);
newSeedButton.addEventListener("click", getNewSeed);
resetButton.addEventListener("click", resetSettings);

// FUNCTIONS //

// Draws and moves all particles across the canvas
function draw() {
  for (let particle of particles) {
    particle.updatePosition();
    particle.show(ctx);
  }
}

// Initializes all of the particles into the particles array
function setup() {
  for (let i = 0; i < particleNum; i++) {
    particles.push(new Particle(cL, particleSize, particleLife));
  }
}

// Updates the particle settings and the selector tab values
function updateSettings() {
  clearCanvas();
  updateParticles();
  updateSettingTab();
  setup();
}

// Updates the particle settings with the HTML slider values
function updateParticles() {
  particles = [];
  particleSize = sizeSelector.value;
  particleNum = numSelector.value;
  particleLife = lifeSelector.value;
  particleColors = [
    colorSelectors[0].value,
    colorSelectors[1].value,
    colorSelectors[2].value,
  ];
  scale = scaleSelector.value;
}

// Updates the numbers next to the HTML sliders
function updateSettingTab() {
  sizeNum.innerHTML = particleSize;
  numNum.innerHTML = particleNum;
  lifeNum.innerHTML = particleLife;
  scaleNum.innerHTML = scale;
}

// Sets the HTML and Particle settings to default
function resetSettings() {
  sizeSelector.value = 0.5;
  numSelector.value = 500;
  scaleSelector.value = 250;
  lifeSelector.value = 500;
  colorSelectors[0].value = "#588157";
  colorSelectors[1].value = "#3a5a40";
  colorSelectors[2].value = "#dad7cd";
  updateSettings();
}

// Reseeds the Perlin Noise
function getNewSeed() {
  perlin.seed();
  updateSettings();
}

// Shorthands the random function
function rand(num) {
  return Math.floor(Math.random() * num);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
