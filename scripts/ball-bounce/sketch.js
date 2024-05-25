const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const cL = window.innerWidth < 500 ? 300 : 400; // Canvas Dimensions
canvas.width = canvas.height = cL;
canvas.style.backgroundColor = "black";
const balls = [];
let frame = 0;

const fps = 240;
const scale = 100;

// MAIN

setup();
setInterval(draw, 1000 / fps);

// FUNCTIONS

function draw() {
  frame++;
  clearCanvas();
  for (let ball of balls) {
    ball.draw(ctx);
    ball.update(frame);
  }
}

function setup() {
  balls.push(
    new Ball(
      cL * 0.25,
      cL / 10,
      basketball.radius,
      basketball.color,
      basketball.stopRatio
    ),
    new Ball(
      cL * 0.75,
      cL / 10,
      tennisball.radius,
      tennisball.color,
      tennisball.stopRatio
    ),
    new Ball(
      cL * 0.5,
      cL / 10,
      bowlingball.radius,
      bowlingball.color,
      bowlingball.stopRatio
    )
  );
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
