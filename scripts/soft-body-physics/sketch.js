const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const cL = canvas.width = canvas.height = window.innerWidth < 650 ? 350 : 600;
canvas.style.backgroundColor = "black";

let gravity;
let mousePos;
let character;
let head;

let mouseDown = false;

const FPS = 60;

const ParticleColor     = "rgb(255, 130, 0)";
const ParticleRadius    = 5;
const RestLength        = 200;
const k                 = 0.01;
const g                 = 0.1;

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

function vectorTowardMouse(v) {
    let move = new Vector(mousePos.x - v.x, mousePos.y - v.y);
    return move;
}

function setup() {
    mousePos = new Vector(0, 0);
    gravity = new Vector(0, g);

    character = new Character();
    head = character.particles[0];
}

function draw() {
    clearCanvas(ctx);

    character.show(ctx); 
 
    if (mouseDown) {
        head.locked = true;
        head.pos.x = mousePos.x;
        head.pos.y = mousePos.y;
        head.locked = false;
    }
}

// Event listeners for mouse events

["mousemove", "touchmove"].forEach((event) => {
    window.addEventListener(event, (e) => {
        trackMouse(e);
    });
});

["mousedown", "touchstart"].forEach((event) => {
    window.addEventListener(event, (e) => {
        mouseDown = true; 
        trackMouse(e);
    });
});

["mouseup", "touchend"].forEach((event) => {
    window.addEventListener(event, () => {
        mouseDown = false;
    });
});

/* MAIN */
setup();
setInterval(draw, 1000 / FPS);
