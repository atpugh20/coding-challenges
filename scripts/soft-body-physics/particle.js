class Particle {
    constructor(x, y, radius, color) {
        this.pos        = new Vector(x, y);
        this.vel        = new Vector(0, 0);
        this.acc        = new Vector(0, 0);
        this.color      = color;
        this.radius     = radius;
        this.mass       = 1;
        this.locked     = false;
    }

    show(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    applyForce(force) {
        let f = new Vector(force.x, force.y);
        f.div(this.mass);
        this.acc.add(f);
    }

    update() {
        if (!this.locked) {
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
            this.vel.mult(0.9);

            if (this.pos.x <= 0) {
                this.pos.x = 0; 
                this.vel.x *= -1;
            }
            if (this.pos.x >= cL) {
                this.pos.x = cL; 
                this.vel.x *= -1;
            }

            if (this.pos.y <= 0) {
                this.pos.y = 0; 
                this.vel.y *= -1;
            }
            if (this.pos.y >= cL) {
                this.pos.y = cL; 
                this.vel.y *= -1;
            }

        }
    }
};