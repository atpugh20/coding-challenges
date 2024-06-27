/* CANVAS SETUP */

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
var cW = (canvas.width = window.innerWidth);
const cH = (canvas.height = window.innerHeight);
canvas.style.backgroundColor = "black";

/* HTML SELECTORS */

/* GLOBALS */
const fps = 60;
const particleNum = 1000;
var mousePos = {};
var particles = [];

/* MAIN */

// adds event listener for when the movement of mouse / finger
["mousemove", "touchmove"].forEach((event) => {
  window.addEventListener(event, (e) => {
    trackMouse(e);
  });
});

// adds event listener for when the user starts a left click / touch
["mousedown", "touchstart"].forEach((event) => {
  window.addEventListener(event, (e) => {
    for (let particle of particles) {
      particle.updateVelocity(mousePos.x, mousePos.y);
    }
  });
});

setup();
setInterval(draw, 1000 / fps);

/* FUNCTIONS */

function draw() {
  clearCanvas();
  for (let particle of particles) {
    particle.update();
    particle.draw(ctx);
  }
}

function setup() {
  for (let i = 0; i < particleNum; i++) {
    particles.push(new Particle(rand(cW), rand(cH), 1, "white"));
  }
}

function resetSettings() {}

// Shorthands the random function
function rand(num) {
  return Math.floor(Math.random() * num);
}

function resizeCanvas() {
  if (window.innerWidth != cW) {
    cW = canvas.width = window.innerWidth;
    resetSettings();
  }
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function trackMouse(e) {
  const rect = canvas.getBoundingClientRect();
  let mouseX;
  let mouseY;
  if (e.changedTouches) {
    mouseX = e.changedTouches[0].clientX - rect.left;
    mouseY = e.changedTouches[0].clientY - rect.top;
  } else {
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  }
  mousePos.x = mouseX;
  mousePos.y = mouseY;
}
