class Spring {
    constructor(k, restLength, pointA, pointB) { 
        this.k = k;
        this.restLength = restLength;
        this.a = pointA;
        this.b = pointB;
        this.color = "white";
    }

    update() {
        let force = new Vector(this.b.pos.x - this.a.pos.x, this.b.pos.y - this.a.pos.y); 
        let x = force.mag() - this.restLength;  
        force.normalize();
        force.mult(this.k * x);
        this.a.applyForce(force);
        force.mult(-1);
        this.b.applyForce(force);
    }

    show(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.moveTo(this.a.pos.x, this.a.pos.y);
        ctx.lineTo(this.b.pos.x, this.b.pos.y);
        ctx.stroke();
    }
};