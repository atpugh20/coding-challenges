// CANVAS SETUP //

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const cL = window.innerWidth < 500 ? 300 : 400; // Canvas Dimensions - mobile: 300px, larger: 400px
canvas.width = canvas.height = cL;
canvas.style.backgroundColor = "black";

// HTML SELECTORS //

const gravityButtons = document.getElementsByClassName("gravity");
const addBallButton = document.getElementById("add-ball-button");
const launchButton = document.getElementById("launch-button");

// GLOBALS //

const balls = [];
let frame = 0;
const fps = 240;
const scale = 150;
const ballSpawn = cL / 2;
let gravityDirection = "down";

// MAIN //

for (let button of gravityButtons) {
  button.addEventListener("click", (e) => {
    for (let b of gravityButtons) {
      b.classList.remove("g-selected");
    }
    e.target.classList.add("g-selected");
    changeGravityDirection(e);
  });
}

addBallButton.addEventListener("click", () => {
  addBall(document.getElementById("selected-ball").value);
});

launchButton.addEventListener("click", () => {
  const launchX = Number(document.getElementById("vel-x").value);
  const launchY = Number(document.getElementById("vel-y").value);
  for (let ball of balls) {
    ball.launch(launchX, launchY);
  }
});

setInterval(draw, 1000 / fps);

// FUNCTIONS //

// draws each ball, then updates their position
function draw() {
  frame++;
  clearCanvas();
  updateGravity();
  for (let ball of balls) {
    ball.draw(ctx);
    ball.update(frame);
  }
}

// Enables user to add a ball to the canvas
function addBall(ball) {
  if (ball == "basket") {
    balls.push(
      new Ball(
        ballSpawn,
        basketball.radius,
        basketball.color,
        basketball.stopRatio
      )
    );
  } else if (ball == "tennis") {
    balls.push(
      new Ball(
        ballSpawn,
        tennisball.radius,
        tennisball.color,
        tennisball.stopRatio
      )
    );
  } else if (ball == "bowling") {
    balls.push(
      new Ball(
        ballSpawn,
        bowlingball.radius,
        bowlingball.color,
        bowlingball.stopRatio
      )
    );
  }
}

// uses the buttons around the canvas to determine the direction of gravity
function changeGravityDirection(e) {
  switch (e.target.id) {
    case "g-down":
      gravityDirection = "down";
      break;
    case "g-up":
      gravityDirection = "up";
      break;
    case "g-left":
      gravityDirection = "left";
      break;
    case "g-right":
      gravityDirection = "right";
      break;
  }
}

// changes gravity direction of each ball with the gravityDirection global
// ensures that balls being added have gravity in the right direction
function updateGravity() {
  for (let ball of balls) {
    switch (gravityDirection) {
      case "down":
        ball.acc.x = 0;
        ball.acc.y = ball.gravity;
        break;
      case "up":
        ball.acc.x = 0;
        ball.acc.y = -ball.gravity;
        break;
      case "left":
        ball.acc.x = -ball.gravity;
        ball.acc.y = 0;
        break;
      case "right":
        ball.acc.x = ball.gravity;
        ball.acc.y = 0;
        break;
    }
  }
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
