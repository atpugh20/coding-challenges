const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const windowSize =
  window.innerHeight < window.innerWidth
    ? window.innerHeight
    : window.innerWidth;
canvas.width = windowSize * (2 / 3);
canvas.height = windowSize * (2 / 3);
const mapSize = canvas.width * (1 / 4);
const particle = new Particle(5, 20);
const rayCountSelector = document.getElementById("ray-count");
const rayColorSelector = document.getElementById("ray-color");
const rayStrengthSelector = document.getElementById("ray-strength");
const fovSelector = document.getElementById("fov");
const walls = [];

// MAIN

window.addEventListener("load", () => {
  setup();
  resetRays();
  updateRays();
  draw();
});

window.addEventListener("keydown", (e) => {
  moveParticle(e);
});

rayCountSelector.addEventListener("input", (e) => {
  particle.updateRayCount(Math.abs(Number(e.target.value)));
  updateRays();
});
rayColorSelector.addEventListener("input", updateRays);
rayStrengthSelector.addEventListener("input", updateRays);
fovSelector.addEventListener("input", updateRays);

// FUNCTIONS

function setup() {
  walls.push(new Boundary(0, 0, mapSize, 0));
  walls.push(new Boundary(0, 0, 0, mapSize));
  walls.push(new Boundary(mapSize, 0, mapSize, mapSize));
  walls.push(new Boundary(0, mapSize, mapSize, mapSize));
  for (let i = 0; i < 5; i++) {
    const x1 = Math.floor(Math.random() * mapSize);
    const y1 = Math.floor(Math.random() * mapSize);
    const x2 = Math.floor(Math.random() * mapSize);
    const y2 = Math.floor(Math.random() * mapSize);
    walls.push(new Boundary(x1, y1, x2, y2));
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawFloor();
  renderWalls();
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, mapSize, mapSize);
  for (let wall of walls) {
    wall.show(ctx);
  }
  particle.show(ctx, walls);
}

function resetRays() {
  rayCountSelector.value = -0.1;
  rayColorSelector.value = "hsl(0, 0%, 100%)";
  rayStrengthSelector.value = 0.7;
  fovSelector.value = 80;
  particle.update(particle.x, particle.y, walls);
}

function updateRays() {
  for (ray of particle.rays) {
    ray.color = rayColorSelector.value;
    ray.strength = rayStrengthSelector.value;
  }
  particle.update(particle.x, particle.y, walls);
  document.getElementById("ray-num").innerHTML = particle.rays.length;
  document.getElementById("strength-num").innerHTML =
    particle.rays[0].length * rayStrengthSelector.value;
  document.getElementById("fov-num").innerHTML = fovSelector.value;
  draw();
}

function moveParticle(e) {
  const pressedKey = e.key;
  switch (pressedKey) {
    case "w":
      particle.move(1, walls);
      updateRays();
      draw();
      break;
    case "s":
      particle.move(0, walls);
      updateRays();
      draw();
      break;
    case "a":
      particle.changeDirection(1, ctx, walls);
      updateRays();
      draw();
      break;
    case "d":
      particle.changeDirection(0, ctx, walls);
      updateRays();
      draw();
      break;
  }
}

function renderWalls() {
  const scene = [];
  for (let ray of particle.rays) {
    if (ray.isInFov(particle.dirDeg, particle.fov)) {
      scene.push(ray);
    }
  }
  const interval = canvas.width / scene.length;
  const diagonal = Math.sqrt(2 * mapSize ** 2);
  let x = 0;
  let wallHeight = 0;
  for (let ray of scene) {
    const renderDistance = getRenderDistance(ray);
    wallHeight = (canvas.height / renderDistance) * 10;
    ctx.fillStyle = getWallColor(renderDistance, rayColorSelector.value);
    ctx.fillRect(
      x,
      canvas.width / 2 - wallHeight / 2,
      interval + 1,
      wallHeight
    );
    x += interval;
  }
}

function getRenderDistance(ray) {
  const newAngle = ray.dirDeg - particle.dirDeg;
  const newAngleRads = (newAngle * Math.PI) / 180;
  const renderDistance = ray.distanceToWall * Math.cos(newAngleRads);
  return renderDistance;
}

function getWallColor(renderDistance, hsl) {
  const strength = Number(rayStrengthSelector.value) / 0.7;
  const colorRange = particle.rays[0].length / strength;
  const colorInterval = Math.floor(
    (renderDistance / canvas.width) * colorRange
  );
  const splitColor = hsl.split(", ");
  const splitBrightness = splitColor[2].split("%");
  var brightnessNum = Number(splitBrightness[0]);
  brightnessNum -= colorInterval * (brightnessNum / 100);
  return `${splitColor[0]}, ${splitColor[1]}, ${brightnessNum}%)`;
}
function drawFloor() {
  let colorNum;
  console.log(canvas.height);
  for (let y = canvas.height; y >= canvas.height / 2; y--) {
    colorNum = (canvas.height * 5) / (y - canvas.height / 2);
    ctx.fillStyle = getWallColor(colorNum, "hsl(0, 0%, 10%)");
    ctx.fillRect(0, y, canvas.width, 1);
  }
  for (let y = canvas.height / 2; y >= 0; y--) {
    colorNum = (canvas.height * 5) / (canvas.height / 2 - y);
    ctx.fillStyle = getWallColor(colorNum, "hsl(0, 0%, 25%)");
    ctx.fillRect(0, y, canvas.width, 1);
  }
}

function IgnoreAlpha(e) {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    // A to Z
    e.returnValue = false;
    e.cancel = true;
  }
}
