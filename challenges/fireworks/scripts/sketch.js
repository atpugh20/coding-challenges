const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const backgroundColor = (canvas.style.backgroundColor = "black");

const cL = (canvas.width = canvas.height = 600);
const particles = [];

let deltaTime = 0;
let previousTime = 0;

function clearCanvas() {
    ctx.clearRect(0, 0, cL, cL);
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, cL, cL);
}

function setup() {
    particles.push(new Particle(300, cL));
}

function render(currentTime) {
    // Delta time
    deltaTime = (currentTime - previousTime) / 1000;
    previousTime = currentTime;

    clearCanvas();

    for (let particle of particles) {
        particle.update(deltaTime, cL);
        particle.draw(ctx);
    }

    requestAnimationFrame(render);
}

// MAIN //
document.addEventListener("DOMContentLoaded", () => {
    setup();
    requestAnimationFrame(render);
});
