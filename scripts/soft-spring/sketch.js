const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const cL = canvas.width = canvas.height = window.innerWidth < 650 ? 350 : 600;
canvas.style.backgroundColor = "black";

const particles = [];
const springs   = [];
let gravity;

let mousePos = {};
let mouseDown = false;

const FPS = 60;

const ParticleColor     = "rgb(255, 130, 0)";
const ParticleRadius    = 5;
const ParticleCount     = 5;
const RestLength        = 10;
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
    return { x: mouseX, y: mouseY };
}

function setup() {
    gravity = new Vector(0, g);
    for (let i = 0; i < ParticleCount; ++i) {
        particles.push(new Particle((cL / 2) + i * 2, cL / 2, ParticleRadius, ParticleColor));
        if (i != 0) {
            springs.push(new Spring(k, RestLength, particles[i], particles[i - 1]));
        }
    }
}

function draw() {
    clearCanvas(ctx);

    // Render and update all elements    
    for (let s of springs) {
        s.update();
        s.show(ctx);
    }
    for (let p of particles) {
        p.applyForce(gravity);
        p.update();
        // p.show(ctx);
    }

    // Lock the head into one place
    let head = particles[0];
    let tail = particles[particles.length - 1];
    head.locked = true;
    head.pos.x = cL / 2;
     
    // Have the tail follow the mouse when clicked
    if (mouseDown) {
        tail.pos.x = mousePos.x;
        tail.pos.y = mousePos.y;
        tail.vel.mult(0);
        tail.update();
    }

    // Render endpoints
    head.show(ctx);
    tail.show(ctx);
}

// Event listeners for mouse events

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

/* MAIN */
setup();
setInterval(draw, 1000 / FPS);
