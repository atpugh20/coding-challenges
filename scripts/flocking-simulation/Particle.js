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
        this.maxVel = 5;
        this.perception = 50;
    }

    align(boids) {
        /**
         * Uses particles within the distance of [perception] to calculate new
         * acceleration.
         */
        const steering = new Vector(0, 0);
        let n = 0; // Number of particles counted

        for (let p of boids) {
            const dist = this.pos.DistanceBetween(p.pos);

            if (dist < this.perception && p != this) {
                steering.Add(p.vel);
                n++;
            }
        }

        if (n > 0) {
            steering.Div(n);
            steering.SetMag(this.maxVel);
            steering.Sub(this.vel);
            steering.Limit(this.maxForce);
        }

        return steering;
    }

    cohesion(boids) {
        /**
         * Uses particles within the distance of [perception] to calculate new
         * acceleration.
         */
        const steering = new Vector(0, 0);
        let n = 0; // Number of particles counted

        for (let p of boids) {
            const dist = this.pos.DistanceBetween(p.pos);

            if (dist < this.perception && p != this) {
                steering.Add(p.pos);
                n++;
            }
        }

        if (n > 0) {
            steering.Div(n);
            steering.Sub(this.pos);
            steering.SetMag(this.maxVel);
            steering.Sub(this.vel);
            steering.Limit(this.maxForce);
        }

        return steering;
    }

    separation(boids) {
        /**
         * Uses particles within the distance of [perception] to calculate new
         * acceleration.
         */
        const steering = new Vector(0, 0);
        let n = 0; // Number of particles counted

        for (let p of boids) {
            const dist = this.pos.DistanceBetween(p.pos);

            if (dist < this.perception && p != this) {
                let diff = new Vector(this.pos.x - p.pos.x, this.pos.y - p.pos.y);
                diff.Div(dist);
                steering.Add(diff);
                n++;
            }
        }

        if (n > 0) {
            steering.Div(n);
            steering.SetMag(this.maxVel);
            steering.Sub(this.vel);
            steering.Limit(this.maxForce);
        }

        return steering;
    }

    getNeighbors(boids) {
        const neighbors = [];

        for (let b of boids) {
            if (this.pos.DistanceBetween(b.pos) < this.perception) {
                neighbors.push(b);
            }
        }

        return neighbors;
    } 


    flock(boids) {
        this.acc.Mult(0);

        const neighbors = this.getNeighbors(boids);

        const alignment = this.align(neighbors);
        const cohesion = this.cohesion(neighbors);
        const separation = this.separation(neighbors);

        this.acc.Add(alignment);
        this.acc.Add(cohesion);
        this.acc.Add(separation);
    }

    update(canvasWidth, canvasHeight) {
        /**
         * Updates the particles position, velocity for a singular frame.
         * Limits acceleration to [this.maxForce]
         */
        this.pos.Add(this.vel);
        this.vel.Add(this.acc);
        this.vel.Limit(this.maxVel);
        this.checkEdge(canvasWidth, canvasHeight);
    }

    checkEdge(canvasWidth, canvasHeight) {
        /**
         * Checks if the particle has reached an edge. If so, it will
         * flip the velocity off that direction.
         */
        if (this.pos.x > canvasWidth) this.pos.x = 0;
        if (this.pos.y > canvasHeight) this.pos.y = 0;
        if (this.pos.x < 0) this.pos.x = canvasWidth;
        if (this.pos.y < 0) this.pos.y = canvasHeight; 
    }

    draw(ctx) {
        /**
         * Draws the particle to the canvas for a frame.
         */
        ctx.fillStyle = this.color;
        // ctx.fillRect(this.pos.x, this.pos.y, this.size, this.size);

        const frontPoint = this.vel.Copy();
        frontPoint.Normalize();
        frontPoint.Mult(this.size)
        frontPoint.Add(this.pos);

        const leftPoint = this.pos.Copy();

        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.pos.x, this.pos.y);
        ctx.lineTo(frontPoint.x, frontPoint.y);
        ctx.stroke();
    }
}
