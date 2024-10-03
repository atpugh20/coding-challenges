/** 
* This project is based on Coding Train's "Elastic Collisions" coding 
* challenge.
*/

/* CANVAS INIT */

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const cW = canvas.width = window.innerWidth;
const cH = canvas.height = window.innerHeight;
canvas.style.backgroundColor = "black";

/* GLOBALS */

const FPS = 60;

let frames = 0;
let initTime = Date.now();
let currentTime;

const colors = ["red", "blue"];
const particles = [];
const numberOfParticles = Math.floor(cW * cH / 2000);

/* FUNCTIONS */

function rand(num) {
  // Simplifies getting a random int between 0 - num
  return Math.floor(Math.random() * num);
}

function clearCanvas(ctx) {  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function showStats() {
  frames++;
  currentTime = Date.now();
  if (currentTime > initTime + 1000) {
    console.log(frames);
    frames = 0;
    initTime = currentTime;
  }
}

function setup() {
  for (let i = 0; i < numberOfParticles; i++) {
    particles.push(new Particle(rand(cW), rand(cH), colors[rand(colors.length)]));
  }
}

function draw() {
  /**
  * This is the main canvas function. It is looped in the setInterval
  * function. It updates each element, then draws them to the canvas.
  */

  showStats();
  clearCanvas(ctx);
  for (let i = 0; i < particles.length; i++) {
    // Collision checks
    for (let j = 0; j < particles.length; j++) {
      if (i === j) continue;
      particles[i].collide(particles[j]);
    }
    particles[i].update(cW, cH);
    particles[i].draw(ctx);
  }
}

/* MAIN */

setup();
setInterval(draw, 1000 / FPS);
