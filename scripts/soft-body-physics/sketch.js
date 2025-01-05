const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const cL = canvas.width = canvas.height = window.innerWidth < 650 ? 350 : 600;
canvas.style.backgroundColor = "black";

// HTML SELECTORS
const linesSelector     = document.getElementById("lines");
const particleSelector  = document.getElementById("particles");
const gravitySelector   = document.getElementById("grav");
const stretchSelector   = document.getElementById("stretch");
const stretchNumber     = document.getElementById("stretch-num");
const resetButton       = document.getElementById("reset-button");

let gravity;
let mousePos;
let character;
let head;

let mouseDown = false;

const FPS = 60;

const ParticleColor     = "rgb(255, 130, 0)";
const ParticleRadius    = 5;
let k                   = 0.01;
const g                 = new Vector(0, 0.25);

function clearCanvas(ctx) {
    ctx.clearRect(0, 0, cL, cL);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cL, cL);
}

function trackMouse(e) {
    /**
     * Updates mousePos with the position of the mouse on the screen
     */
    const rect = canvas.getBoundingClientRect();

    if (e.changedTouches) {
        mouseX = e.changedTouches[0].clientX - rect.left;
        mouseY = e.changedTouches[0].clientY - rect.top;
    } else {
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    }
    mousePos.x = mouseX;
    mousePos.y = mouseY;
}

function setup() {
    mousePos = new Vector(0, 0);
    gravity = new Vector(0, g);
    character = new Character(k);
    head = character.particles[0];
}

function draw() {
    clearCanvas(ctx);

    character.update();
    character.show(ctx);

    // Control with mouse
    if (mouseDown) {
        head.locked = true;
        head.pos.x = mousePos.x;
        head.pos.y = mousePos.y;
        head.vel.mult(0);
        head.acc.mult(0);
    } else {
        head.locked = false;
    } 

    if (gravitySelector.checked) {
        for (let p of character.particles) {
            p.applyForce(g);
        }
    } 
}

function resetSettings() {
    linesSelector.checked       = false;
    particleSelector.checked    = false;
    gravitySelector.checked     = false; 
    stretchSelector.value       = 0.01;
    character.updateK(stretchSelector.value);
    stretchNumber.textContent   = stretchSelector.value;
}

// Event listeners for mouse and slider events

["mousemove", "touchmove"].forEach((event) => {
    window.addEventListener(event, (e) => {
        trackMouse(e);
    });
});

["mousedown", "touchstart"].forEach((event) => {
    window.addEventListener(event, (e) => { 
        if (mousePos.x > 0 && 
            mousePos.y > 0 &&
            mousePos.x < cL &&
            mousePos.y < cL
        ) {
            trackMouse(e);
            mouseDown = true; 
        } else {
            mouseDown = false;
        }
    });
});

["mouseup", "touchend"].forEach((event) => {
    window.addEventListener(event, () => {
        mouseDown = false;
    });
});

resetButton.addEventListener("click", resetSettings);
stretchSelector.addEventListener("input", () => { 
    character.updateK(stretchSelector.value);
    stretchNumber.textContent = stretchSelector.value;
});

/* MAIN */
setup();
setInterval(draw, 1000 / FPS);
