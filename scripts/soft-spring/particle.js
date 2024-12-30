class Particle {
    constructor(x, y, radius, color) {
        this.pos        = { x: x, y: y };
        this.vel        = { x: 0, y: 0 };
        this.acc        = { x: 0, y: 1 };
        this.radius     = radius;
        this.color      = color;
        this.restLength = 100;
        this.k          = 0.01;
    }

    show(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    distanceToAnchor(deltaX, deltaY) {
        return Math.sqrt((deltaX * deltaX) + (deltaY * deltaY));
    }

    applyForce(anchorX, anchorY) {
        
        let force = { x: this.pos.x - anchorX, y: this.pos.y - anchorY };
        const distToAnchor = this.distanceToAnchor(force.x, force.y);
        let x = distToAnchor - this.restLength; 
        
        // Normalize force
        force.x /= distToAnchor;
        force.y /= distToAnchor;

        // Get spring force
        force.x *= -1 * this.k * x;
        force.y *= -1 * this.k * x;

        // Apply the force
        this.vel.x += force.x;
        this.vel.y += force.y;
    }

    update(anchorX, anchorY) {
        this.applyForce(anchorX, anchorY);

        this.vel.x += this.acc.x;
        this.vel.y += this.acc.y;
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;

        this.vel.x *= 0.99;
        this.vel.y *= 0.99;
    }
};