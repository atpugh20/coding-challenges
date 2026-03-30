class Particle {
    constructor(posX, posY, size, color) {
        this.pos = new Vector(posX, posY);
        this.vel = new Vector(0, 0);
        this.vel.Randomize();
        this.vel.Mult(5);
        this.acc = new Vector(0, 0);

        this.size = size;
        this.color = color;

        this.maxForce = 0.1; // sets max acceleration
        this.perception = 50;
    }

    align(flockCollection) {
        /**
         * Uses particles within the distance of [perception] to calculate new
         * acceleration.
         */
        const steering = new Vector(0, 0);
        let n = 0; // Number of particles counted

        for (let p of flockCollection) {
            const dist = this.pos.DistanceBetween(p.pos);

            if (dist < this.perception && p != this) {
                steering.Add(p.vel);
                n++;
            }
        }

        if (n > 0) {
            steering.Div(n);
        }

        steering.Sub(this.vel);
        this.acc.Add(steering);
    }

    update(canvasWidth, canvasHeight) {
        /**
         * Updates the particles position, velocity for a singular frame.
         * Limits acceleration to [this.maxForce]
         */
        this.acc.Limit(this.maxForce);
        this.pos.Add(this.vel);
        this.vel.Add(this.acc);

        this.checkEdge(canvasWidth, canvasHeight);
    }

    checkEdge(canvasWidth, canvasHeight) {
        /**
         * Checks if the particle has reached an edge. If so, it will
         * flip the velocity off that direction.
         */
        if (this.pos.x > canvasWidth) {
            this.pos.x = canvasWidth;
            this.vel.x *= -1;
        }
        if (this.pos.y > canvasHeight) {
            this.pos.y = canvasHeight;
            this.vel.y *= -1;
        }
        if (this.pos.x < 0) {
            this.pos.x = 0;
            this.vel.x *= -1;
        }
        if (this.pos.y < 0) {
            this.pos.y = 0;
            this.vel.y *= -1;
        }
    }

    draw(ctx) {
        /**
         * Draws the particle to the canvas for a frame.
         */
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos.x, this.pos.y, this.size, this.size);

        const leadX = this.pos.x + this.vel.x;
        const leadY = this.pos.y + this.vel.x;

        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.lineTo(leadX, leadY);
        ctx.stroke();

        // ctx.moveTo();
    }
}
