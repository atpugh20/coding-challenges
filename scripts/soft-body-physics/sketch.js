const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const cL = window.innerWidth < 650 ? 350 : 600;
canvas.width = canvas.height = cL;
canvas.style.backgroundColor = "black";

const FPS = 60;

const particles = [];
const springs   = [];

function setup() {
    particles.push(new Particle(50, 55, 2));
}

function draw() {
    clearCanvas(ctx);

    for (let p of particles) {
        p.update();
        p.show(ctx);
    }
}

function clearCanvas(ctx) {
    ctx.clearRect(0, 0, cL, cL);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cL, cL);
}

function main() {
    setup();
    setInterval(draw, 1000 / FPS);
}

main();