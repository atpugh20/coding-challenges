const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Sizing
const wH = window.innerHeight;
const wW = window.innerWidth;
const wS = wW > wH ? wH : wW; // Smaller Size

canvas.width = wS * (7 / 10);
canvas.height = wS * (7 / 10);
const mS = canvas.width * (1 / 4); // Map Size

// Object Declaration
const objects = new Objects(ctx);
const particle = new Particle(mS / 4, mS / 5);

// MAIN

let id = null;
window.addEventListener("load", () => {
  setup();
  draw();
});
window.addEventListener("resize", () => {
  if (wH !== window.innerHeight || wW !== window.innerWidth) {
    window.location.reload();
  }
});

["keydown", "mousedown", "touchstart"].forEach((eventType) => {
  window.addEventListener(
    eventType,
    (e) => {
      if (e.repeat) return;
      console.log(e.targetTouches);
      clearInterval(id);
      moveParticle(e);
    },
    true
  );
});

["keyup", "mouseup", "touchend"].forEach((eventType) => {
  window.addEventListener(eventType, (e) => {
    clearInterval(id);
  });
});

// FUNCTIONS

function draw() {
  clearCanvas();
  renderFloor();
  objects.renderObjects(particle, canvas);
  drawMiniMap();
}

function moveParticle(e) {
  id = setInterval(() => {
    if (e.key === "w" || e.target.classList.contains("up")) {
      particle.move(1, objects);
      draw();
    } else if (e.key === "s" || e.target.classList.contains("down")) {
      particle.move(0, objects);
      draw();
    } else if (e.key === "a" || e.target.classList.contains("left")) {
      particle.changeDirection(1, ctx, objects);
      draw();
    } else if (e.key === "d" || e.target.classList.contains("right")) {
      particle.changeDirection(0, ctx, objects);
      draw();
    }
  }, 16.66);
}

// Reduces the fishbowl POV effect
function getRenderDistance(ray) {
  const newAngle = ray.dirDeg - particle.dirDeg;
  const newAngleRads = (newAngle * Math.PI) / 180;
  const renderDistances = [];
  // for (let object of ray.objects) {
  renderDistances.push(ray.object.dist * Math.cos(newAngleRads));
  // }
  return renderDistances;
}

// Fix the getWallColor aspect of this
function renderFloor() {
  let colorNum;
  for (let y = canvas.height; y >= canvas.height / 2; y--) {
    colorNum = (canvas.height * 5) / (y - canvas.height / 2 + 10);
    ctx.fillStyle = particle.rays[0].getObjectColor(
      colorNum,
      "hsl(120, 61%, 34%)",
      particle
    );
    ctx.fillRect(0, y, canvas.width, 1);
  }
  for (let y = canvas.height / 2; y >= 0 / 2; y--) {
    colorNum = (canvas.height * 5) / (y - canvas.height / 2 - 10);
    ctx.fillStyle = particle.rays[0].getObjectColor(
      colorNum,
      "hsl(195, 100%, 50%)",
      particle
    );
    ctx.fillRect(0, y, canvas.width, 1);
  }
  // for (let y = canvas.height / 2; y >= 0; y--) {
  //   colorNum = (canvas.height * 5) / (canvas.height / 2 - y);
  //   ctx.fillStyle = particle.rays[0].getObjectColor(
  //     colorNum,
  //     "hsl(0, 0%, 25%)",
  //     particle
  //   );
  //   ctx.fillRect(0, y, canvas.width, 1);
  // }
}

function drawMiniMap() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, mS, mS);
  particle.show(ctx, objects);
  for (let boundary of objects.boundaries) {
    boundary.show(ctx);
  }
}

function getScene(rays) {
  const scene = [];
  for (let ray of rays) {
    ray.cast(objects);
    if (ray.isInFov(particle.dirDeg, particle.fov)) {
      scene.push(ray);
    }
  }
  return scene;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function setup() {
  const gameSection = document.getElementById("game-section");
  gameSection.style.width = `${canvas.width}px`;
  const gameButtonSection = document.getElementById("game-buttons");
  gameButtonSection.style.width = `${canvas.width}px`;
  const gameButtons = document.getElementsByClassName("game-button");
  for (let button of gameButtons) {
    button.style.width = `${canvas.width / 6}px`;
    button.style.fontSize = `${canvas.width / 8}px`;
  }
  if (wW >= wH) repositionButtons();
  gameButtonSection.addEventListener(
    "touchmove",
    (event) => event.scale !== 1 && event.preventDefault(),
    { passive: false }
  );
}

function repositionButtons() {
  const gameButtonSection = document.getElementById("game-buttons");
  const bButton = document.getElementById("b-button");
  const aButton = document.getElementById("a-button");
  canvas.style.position = "absolute";
  canvas.style.top = "50%";
  canvas.style.left = "50%";
  canvas.style.transform = "translate(-50%, -50%)";
  gameButtonSection.style.margin = "auto";
  gameButtonSection.style.position = "absolute";
  gameButtonSection.style.top = "50%";
  gameButtonSection.style.left = "50%";
  gameButtonSection.style.transform = "translate(-50%, -50%)";
  bButton.style.gridColumn = "5";
  aButton.style.gridColumn = "6";
  const gameButtons = document.getElementsByClassName("game-button");
  if (wW < wH * 2) {
    gameButtonSection.style.width = `${canvas.width * 1.75}px`;
    gameButtonSection.style.gridTemplateColumns =
      "1fr 1fr 1fr 14fr 1fr 1fr 1fr";
    for (let button of gameButtons) {
      button.style.width = `${canvas.width / 12}px`;
      button.style.fontSize = `${canvas.width / 16}px`;
    }
  } else {
    gameButtonSection.style.width = `${canvas.width * 2.2}px`;
    gameButtonSection.style.gridTemplateColumns = "1fr 1fr 1fr 9fr 1fr 1fr 1fr";
  }
}
