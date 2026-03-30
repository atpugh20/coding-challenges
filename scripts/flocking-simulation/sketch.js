const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const cW = (canvas.width = window.innerWidth);
const cH = (canvas.height = window.innerHeight);
const backgroundColor = "black";

const FPS = 30;
const flockCount = 100;
const particleSize = 5;

const flock = [];

function clearCanvas(ctx) {
    ctx.clearRect(0, 0, cW, cH);
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, cW, cH);
}

function setup() {
    for (let i = 0; i < flockCount; i++) {
        const rX = Math.floor(Math.random() * cW);
        const rY = Math.floor(Math.random() * cH);

        const p = new Particle(rX, rY, particleSize, "white");
        flock.push(p);
    }
}

function draw() {
    // Runs once every frame
    clearCanvas(ctx);

    for (let particle of flock) {
        particle.align(flock);
        particle.update(cW, cH);
        particle.draw(ctx);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    setup();
    setInterval(draw, 1000 / FPS);
});
