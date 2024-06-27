// CANVAS SETUP //

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const sL = window.innerWidth < 600 ? 350 : 600; // Canvas Dimensions - mobile: 350px, larger: 600px
canvas.width = canvas.height = sL;

// HTML SELECTORS //

const rayCountSlider = document.getElementById("ray-count");
const rayColorSelector = document.getElementById("ray-color");
const rayLengthSelector = document.getElementById("ray-length");
const rayStrengthSelector = document.getElementById("ray-strength");

// GLOBALS //

const particle = new Particle(sL / 2, sL / 2);
const walls = [];
for (let i = 0; i < 5; i++) {
  const x1 = Math.floor(Math.random() * sL);
  const y1 = Math.floor(Math.random() * sL);
  const x2 = Math.floor(Math.random() * sL);
  const y2 = Math.floor(Math.random() * sL);
  walls.push(new Boundary(x1, y1, x2, y2));
}

// MAIN //

window.addEventListener("load", () => {
  resetRays();
  draw();
});

// sets the light particle to move with the mouse
["mousemove", "touchmove"].forEach((event) => {
  canvas.addEventListener(event, (e) => {
    trackMouse(e);
    draw();
  });
});

// these listeners update the canvas when the html sliders are changed
rayCountSlider.addEventListener("input", (e) => {
  particle.updateRayCount(Math.abs(Number(e.target.value)));
  updateRays();
});
rayColorSelector.addEventListener("input", updateRays);
rayLengthSelector.addEventListener("input", updateRays);
rayStrengthSelector.addEventListener("input", updateRays);

// FUNCTIONS

// draws the light particle and all of the walls
function draw() {
  clearCanvas();
  for (let wall of walls) {
    wall.show(ctx);
  }
  particle.show(ctx, walls);
}

// sets html sliders back to default
function resetRays() {
  rayCountSlider.value = -2.1;
  rayColorSelector.value = "white";
  rayLengthSelector.value = 1000;
  rayStrengthSelector.value = 0.7;
  particle.update(particle.x, particle.y);
}

// updates ray settings with html slider values
function updateRays() {
  for (ray of particle.rays) {
    ray.color = rayColorSelector.value;
    ray.length = rayLengthSelector.value;
    ray.strength = rayStrengthSelector.value;
  }
  particle.update(particle.x, particle.y);
  draw();
}

//gets the mouse/touch position on the canvas and updates the particle with it
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
  particle.update(mouseX, mouseY);
}

function clearCanvas() {
  ctx.clearRect(0, 0, sL, sL);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, sL, sL);
}
