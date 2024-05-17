const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Sizing
const wH = window.innerHeight;
const wW = window.innerWidth;
const wS = wW > wH ? wH : wW; // Smaller Size

canvas.width = wS / 2;
canvas.height = wS / 2;
const mS = canvas.width * (1 / 4); // Map Size

// Object Declaration
const objects = new Objects(ctx);
const particle = new Particle(mS / 4, mS / 5);

// MAIN

let id = null;
let itemNum = 0;
window.addEventListener("load", () => {
  setup();
  draw(itemNum);
});
window.addEventListener("resize", () => {
  if (wW !== window.innerWidth) {
    window.location.reload();
  }
});

["keydown", "mousedown", "touchstart"].forEach((eventType) => {
  window.addEventListener(
    eventType,
    (e) => {
      if (e.repeat) return;
      clearInterval(id);
      handleButtonPress(e);
    },
    true
  );
});

["keyup", "mouseup", "touchend"].forEach((eventType) => {
  window.addEventListener(eventType, (e) => {
    if (e.key === "k" || e.target.classList.contains("a-button")) {
      itemNum = itemNum === 0 ? 1 : 0;
    }
    clearInterval(id);
    draw(itemNum);
  });
});

// FUNCTIONS

function draw(itemNum, frame = 0) {
  clearCanvas();
  renderFloor();
  renderObjects();
  drawMiniMap(ctx, objects);
  renderHeldItem(frame, itemNum);
}

function handleButtonPress(e) {
  let frame = 0;
  id = setInterval(() => {
    if (e.key === "w" || e.target.classList.contains("up")) {
      particle.move(1, objects);
      draw(itemNum);
    } else if (e.key === "s" || e.target.classList.contains("down")) {
      particle.move(0, objects);
      draw(itemNum);
    } else if (e.key === "a" || e.target.classList.contains("left")) {
      particle.changeDirection(1, ctx, objects);
      draw(itemNum);
    } else if (e.key === "d" || e.target.classList.contains("right")) {
      particle.changeDirection(0, ctx, objects);
      draw(itemNum);
    } else if (e.key === "j" || e.target.classList.contains("b-button")) {
      if (frame < 5) {
        draw(itemNum, frame);
      } else {
        draw(itemNum, 0);
      }
    }
    frame++;
  }, 16.67);
}

function renderObjects() {
  const scene = getScene(particle.rays);
  const interval = canvas.width / scene.length;
  let x = 0;
  for (let ray of scene) {
    if (ray.object.obj === null) continue;
    const renderDistance = getRenderDistance(ray);
    const adjustedObjectHeight = (ray.object.obj.height / 1000) * canvas.height;
    let renderHeight = (canvas.height / renderDistance) * adjustedObjectHeight;
    ctx.fillStyle = ray.getObjectColor(
      ray.object.dist,
      ray.object.obj.color,
      particle
    );
    ctx.fillRect(
      x,
      canvas.height / 2 - renderHeight / 2,
      interval + 1,
      renderHeight
    );
    x += interval;
  }
}

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
}

function renderHeldItem(frame, itemNum) {
  objects.items[itemNum].render(ctx, frame, id, draw);
}

function drawMiniMap(ctx, objects) {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, mS, mS);
  particle.show(ctx);
  for (let boundary of objects.boundaries) {
    boundary.show(ctx);
  }
}

// Reduces the fishbowl POV effect
function getRenderDistance(ray) {
  const newAngle = ray.dirDeg - particle.dirDeg;
  const newAngleRads = (newAngle * Math.PI) / 180;
  const renderDistances = ray.object.dist * Math.cos(newAngleRads);
  return renderDistances;
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
  const gameButtonSection = document.getElementById("game-buttons");
  const gameButtons = document.getElementsByClassName("game-button");
  if (wW >= wH) {
    repositionButtons();
  } else {
    gameSection.style.width = `${canvas.width}px`;
    gameButtonSection.style.width = `${canvas.width}px`;
    for (let button of gameButtons) {
      button.style.width = `${canvas.width / 6}px`;
      button.style.fontSize = `${canvas.width / 8}px`;
    }
  }
  for (let button of gameButtons) {
    button.style.visibility = "visible";
  }
}

function repositionButtons() {
  const gameButtonSection = document.getElementById("game-buttons");
  gameButtonSection.style.margin = "auto";
  gameButtonSection.style.position = "absolute";
  gameButtonSection.style.top = "50%";
  gameButtonSection.style.left = "50%";
  gameButtonSection.style.transform = "translate(-50%, -50%)";

  const gameButtons = document.getElementsByClassName("game-button");
  if (wW < wH * 2) {
    gameButtonSection.style.width = `${canvas.width * 1.9}px`;
    gameButtonSection.style.gridTemplateColumns =
      "1fr 1fr 1fr 14fr 1fr 1fr 1fr";
    for (let button of gameButtons) {
      button.style.width = `${canvas.width / 8}px`;
      button.style.fontSize = `${canvas.width / 10}px`;
    }
  } else {
    gameButtonSection.style.width = `${canvas.width * 3}px`;
    gameButtonSection.style.gridTemplateColumns = "1fr 1fr 1fr 9fr 1fr 1fr 1fr";
    for (let button of gameButtons) {
      button.style.width = `${canvas.width / 5}px`;
      button.style.fontSize = `${canvas.width / 7}px`;
    }
  }
}
