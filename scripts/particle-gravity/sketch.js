/* CANVAS SETUP */

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
var cW = (canvas.width = window.innerWidth);
const cH = (canvas.height = window.innerHeight);
canvas.style.backgroundColor = "black";

/* HTML SELECTORS */

/* GLOBALS */
const FPS = 240;
const PARTICLENUM = 5000;
const PARTICLESIZE = 3;
var mousePos = {};
var particles = [];
var interval;

/* MAIN */

// Tracks the mouse's canvas position
["mousemove", "touchmove"].forEach((event) => {
  window.addEventListener(event, (e) => {
    trackMouse(e);
  });
});

// On click / touch, all particles move towards mouse
["mousedown", "touchstart"].forEach((event) => {
  window.addEventListener(event, (e) => {
    clearInterval(interval);
    interval = setInterval(() => {
      for (let particle of particles) {
        particle.updateVelocity(mousePos.x, mousePos.y);
      }
    }, 1000 / FPS);
  });
});

// On release, all particles move back towards original positions
["mouseup", "touchend"].forEach((event) => {
  window.addEventListener(event, () => {
    clearInterval(interval);
    let counter = 0;
    interval = setInterval(() => {
      counter++;
      for (let particle of particles) {
        particle.updateVelocity(particle.initialPos.x, particle.initialPos.y);
      }
      // On frame FPS, particles stop entirely
      if (counter > FPS) {
        for (let particle of particles) {
          particle.vel.x = 0;
          particle.vel.y = 0;
        }
      }
    }, 1000 / FPS);
  });
});
window.addEventListener("resize", resizeCanvas);
setup();
setInterval(draw, 1000 / FPS);

/* FUNCTIONS */

// Draws all particles to screen and updates their positions
function draw() {
  clearCanvas();
  for (let particle of particles) {
    particle.update();
    particle.draw(ctx);
  }
}

// Initialize particles in random spots with random colors
function setup() {
  for (let i = 0; i < PARTICLENUM; i++) {
    particles.push(
      new Particle(
        rand(cW),
        rand(cH),
        PARTICLESIZE,
        `hsl(${rand(360)}, 50%, 50%)`
      )
    );
  }
}

// Shorthands the random function
function rand(num) {
  return Math.floor(Math.random() * num);
}

// Resizes canvas width with the window
function resizeCanvas() {
  if (window.innerWidth != cW) {
    cW = canvas.width = window.innerWidth;
    particles = [];
    setup();
  }
}

// Erases what was drawn on the canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Updates the mouse position according to the canvas
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
