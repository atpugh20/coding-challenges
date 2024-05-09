const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth * (2 / 3);
canvas.height = window.innerWidth * (2 / 3);
const particle = new Particle(canvas.width / 2, canvas.height / 2);
const walls = [];
const rayCountSlider = document.getElementById("ray-count");
const rayColorSelector = document.getElementById("ray-color");
const rayLengthSelector = document.getElementById("ray-length");
const rayStrengthSelector = document.getElementById("ray-strength");
for (let i = 0; i < 5; i++) {
  const x1 = Math.floor(Math.random() * canvas.width);
  const y1 = Math.floor(Math.random() * canvas.width);
  const x2 = Math.floor(Math.random() * canvas.width);
  const y2 = Math.floor(Math.random() * canvas.width);
  walls.push(new Boundary(x1, y1, x2, y2));
}

// MAIN

window.addEventListener("load", () => {
  resetRays();
  draw();
});

canvas.addEventListener("mousemove", (e) => {
  trackMouse(e);
  draw();
});

rayCountSlider.addEventListener("input", (e) => {
  particle.updateRayCount(Math.abs(Number(e.target.value)));
  updateRays();
});
rayColorSelector.addEventListener("input", updateRays);
rayLengthSelector.addEventListener("input", updateRays);
rayStrengthSelector.addEventListener("input", updateRays);

// FUNCTIONS

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let wall of walls) {
    wall.show(ctx);
  }

  particle.show(ctx, walls);
}

function resetRays() {
  rayCountSlider.value = -0.1;
  rayColorSelector.value = "white";
  rayLengthSelector.value = 1000;
  rayStrengthSelector.value = 0.7;
  particle.update(particle.x, particle.y);
}

function updateRays() {
  for (ray of particle.rays) {
    ray.color = rayColorSelector.value;
    ray.length = rayLengthSelector.value;
    ray.strength = rayStrengthSelector.value;
  }
  particle.update(particle.x, particle.y);
  draw();
}

function trackMouse(e) {
  const rect = canvas.getBoundingClientRect();
  var mouseX = e.clientX - rect.left;
  var mouseY = e.clientY - rect.top;
  particle.update(mouseX, mouseY);
}
