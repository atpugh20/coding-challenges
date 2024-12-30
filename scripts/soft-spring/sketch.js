const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const cL = canvas.width = canvas.height = 600;
canvas.style.backgroundColor = "black";

const FPS = 60;

const anchor = new Particle(300, 0,   15, "white");
const end    = new Particle(300, 300, 30, "white");
const spring = new Spring(anchor.pos.x, anchor.pos.y, end.pos.x, end.pos.y, "white");

let mousePos = {};
let mouseDown = false;

function clearCanvas(ctx) {
    ctx.clearRect(0, 0, cL, cL);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cL, cL);
}

function trackMouse(e) {
  const rect = canvas.getBoundingClientRect();

  if (e.changedTouches) {
    mouseX = e.changedTouches[0].clientX - rect.left;
    mouseY = e.changedTouches[0].clientY - rect.top;
  } else {
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  }
  return { x: mouseX, y: mouseY };
}

function setup() {}

function draw() {
    clearCanvas(ctx);

    if (!mouseDown) {
        end.update(anchor.pos.x, anchor.pos.y);
    } else {
        end.pos = mousePos;
    }

    spring.update(anchor.pos.x, anchor.pos.y, end.pos.x, end.pos.y);

    spring.show(ctx);
    anchor.show(ctx);
    end.show(ctx);
}

/* MAIN */

["mousemove", "touchmove"].forEach((event) => {
    window.addEventListener(event, (e) => {
        mousePos = trackMouse(e);
    });
});

["mousedown", "touchstart"].forEach((event) => {
    window.addEventListener(event, (e) => {
        mouseDown = true; 
        mousePos = trackMouse(e);
    });
});

["mouseup", "touchend"].forEach((event) => {
    window.addEventListener(event, () => {
        mouseDown = false;
    });
});

setup();
setInterval(draw, 1000 / FPS);
