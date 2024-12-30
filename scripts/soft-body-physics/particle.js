class Particle {
    constructor(x, y, size) {
        this.pos = { x: x, y: y };
        this.vel = { x: 1, y: 1 };
        this.acc = { x: 0, y: 0 };
        this.size = size;
    }

    show(ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(this.pos.x, this.pos.y, this.size, this.size);
    }

    update() {
        this.vel.x += this.acc.x;
        this.vel.y += this.acc.y;
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        
        if (this.pos.x <= 0 || this.pos.x >= cL) 
            this.vel.x *= -1;
        if (this.pos.y <= 0 || this.pos.y >= cL)
            this.vel.y *= -1;
    }
};