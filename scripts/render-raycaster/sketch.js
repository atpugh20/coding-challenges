// CANVAS SETUP //

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const sL = window.innerWidth < 600 ? 350 : 600; // Canvas Dimensions - mobile: 350px, larger: 600px
canvas.width = canvas.height = sL;

// HTML SELECTORS //

const rayCountSelector = document.getElementById("ray-count");
const rayColorSelector = document.getElementById("ray-color");
const rayStrengthSelector = document.getElementById("ray-strength");
const fovSelector = document.getElementById("fov");

// GLOBALS //

const mapSize = canvas.width * (1 / 4);
const particle = new Particle(5, 18);
const walls = [];

// MAIN //

// initial load and draw
window.addEventListener("load", () => {
  setup();
  resetRays();
  updateRays();
  draw();
});

// moves particle with the keyboard
window.addEventListener("keydown", (e) => {
  moveParticle(e);
});

// these listeners update the ray settings with the html selectors
rayCountSelector.addEventListener("input", (e) => {
  particle.updateRayCount(Math.abs(Number(e.target.value)));
  updateRays();
});
rayColorSelector.addEventListener("input", updateRays);
rayStrengthSelector.addEventListener("input", updateRays);
fovSelector.addEventListener("input", updateRays);

// FUNCTIONS

// pushes each wall into the walls array (4 edge walls and 5 random walls)
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

// draws the floor, walls, and minimap to the canvas
function draw() {
  clearCanvas();
  renderFloor();
  renderWalls();
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, mapSize, mapSize);
  for (let wall of walls) {
    wall.show(ctx);
  }
  particle.show(ctx, walls);
}

// sets the html selectors back to default, then updates the particle with these values
function resetRays() {
  rayCountSelector.value = -0.1;
  rayColorSelector.value = "hsl(0, 0%, 100%)";
  rayStrengthSelector.value = 0.7;
  fovSelector.value = 80;
  particle.update(particle.x, particle.y, walls);
}

// updates the rays with changed html selector values
function updateRays() {
  for (ray of particle.rays) {
    ray.color = rayColorSelector.value;
    ray.strength = rayStrengthSelector.value;
  }
  particle.update(particle.x, particle.y, walls);
  document.getElementById("ray-num").innerHTML = Math.floor(
    (particle.rays.length * fovSelector.value) / 360
  );
  document.getElementById("strength-num").innerHTML = Math.floor(
    particle.rays[0].length * rayStrengthSelector.value
  );
  document.getElementById("fov-num").innerHTML = fovSelector.value;
  draw();
}

// enables the keyboard to move the particle around the minimap, and then re-renders the view
function moveParticle(e) {
  const pressedKey = e.key;
  const currentTime = Date.now();
  lastUpdateTime = currentTime;
  switch (pressedKey) {
    case "w":
      for (let i = 0; i < 2; i += particle.moveDistance) {
        particle.move(1, walls);
        updateRays();
        draw();
      }
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

// renders a first-person POV, drawn from the FOV on the minimap
function renderWalls() {
  const scene = [];
  for (let ray of particle.rays) {
    if (ray.isInFov(particle.dirDeg, particle.fov)) {
      scene.push(ray);
    }
  }
  const interval = canvas.width / scene.length;
  let x = 0;
  let wallHeight = 0;
  // height is decided by the distance of the particle from the wall
  // the getRenderDistance function calculates this
  for (let ray of scene) {
    const renderDistance = getRenderDistance(ray);
    wallHeight = (canvas.height / renderDistance) * 10;
    ctx.fillStyle = getWallColor(ray.distanceToWall, rayColorSelector.value);
    ctx.fillRect(
      x,
      canvas.width / 2 - wallHeight / 2,
      interval + 1,
      wallHeight
    );
    x += interval;
  }
}

// uses the length of the ray to get the height that needs to be displayed
//  and reduces the fish bowl visual effect
function getRenderDistance(ray) {
  const newAngle = ray.dirDeg - particle.dirDeg;
  const newAngleRads = (newAngle * Math.PI) / 180;
  const renderDistance = ray.distanceToWall * Math.cos(newAngleRads);
  return renderDistance;
}

// adjusts the color of the walls based off of the ray distance
// makes the walls appear closer / further
function getWallColor(distanceToWall, hsl) {
  const splitColor = hsl.split(", ");
  const splitBrightness = splitColor[2].split("%");
  const maxBrightness = Number(splitBrightness[0]);
  let brightnessNum;
  const strength = Number(rayStrengthSelector.value);
  const lightRange = particle.rays[0].length * strength;

  // Considers Ray Strength
  if (lightRange >= distanceToWall) {
    brightnessNum =
      maxBrightness - (distanceToWall / lightRange) * maxBrightness + 1;
  } else {
    brightnessNum = 0;
  }

  return `${splitColor[0]}, ${splitColor[1]}, ${brightnessNum}%)`;
}

// adjusts the color of the floor based on its canvas y-value
function renderFloor() {
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

// prevents the keyboard from changing the color of the rays / walls
function IgnoreAlpha(e) {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    // A to Z
    e.returnValue = false;
    e.cancel = true;
  }
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
