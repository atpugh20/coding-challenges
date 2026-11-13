class Particle {
    constructor(x = 0, y = 0, size = 5, color = "white") {
        // Position data
        this.pos = new vec2(x, y);
        this.vel = new vec2(0, -1000);
        this.acc = new vec2(0, 1000);

        this.startingVel = this.vel;

        // Visual Data
        this.size = size;
        this.color = color;
    }

    update(deltaTime, canvasHeight) {
        this.vel = this.vel.add(this.acc.multiply(deltaTime));
        this.pos = this.pos.add(this.vel.multiply(deltaTime));

        // Respawn
        if (this.pos.y > canvasHeight + 10) {
            const newX = Math.floor(Math.random() * canvasHeight);
            const newPos = new vec2(newX, canvasHeight);
            this.reset(newPos, this.startingVel);
        }
    }

    draw(ctx) {
        const halfSize = this.size / 2;

        ctx.fillStyle = this.color;
        ctx.fillRect(
            this.pos.x - halfSize,
            this.pos.y - halfSize,
            this.size,
            this.size,
        );
    }

    setPos(vec) {
        this.pos.x = vec.x;
        this.pos.y = vec.y;
    }

    setVel(vec) {
        this.vel.x = vec.x;
        this.vel.y = vec.y;
    }

    setAcc(vec) {
        this.acc.x = vec.x;
        this.acc.y = vec.y;
    }

    reset(newPos, newVel) {
        this.setPos(newPos);
        this.setVel(newVel);
    }
}
