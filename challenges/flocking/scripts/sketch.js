const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const cW = (canvas.width = window.innerWidth);
const cH = (canvas.height = window.innerHeight);
const backgroundColor = "black";

const FPS = 30;
const flockCount = 1000;
const particleSize = 10;

const boids = [];

function clearCanvas(ctx) {
    ctx.clearRect(0, 0, cW, cH);
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, cW, cH);
}

function rand(num) {
    return Math.floor(Math.random() * num)
}

function randomColor() {
    return `rgb(${rand(255)}, ${rand(255)}, ${rand(255)})`
}

function setup() {
    for (let i = 0; i < flockCount; i++) {
        const rX = rand(cW);
        const rY = rand(cH);

        const p = new Particle(rX, rY, particleSize, randomColor());
        boids.push(p);
    }
}

function draw() {
    // Runs once every frame
    clearCanvas(ctx);

    for (let particle of boids) {
        particle.flock(boids);
        particle.update(cW, cH);
        particle.draw(ctx);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    setup();
    setInterval(draw, 1000 / FPS);
});
