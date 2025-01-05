class Character {
    constructor(k) {
        this.k = k;
        this.vel = new Vector(0, 0);

        this.verticies = [
            // Top 
            200, 300,
            250, 300,
            300, 300,
            350, 300,
            400, 300,
            
            // Center Right
            350, 400,  
            
            // Bottom
            400, 500,
            350, 500,
            300, 500,
            250, 500,
            200, 500,
            
            // Center Left
            250, 400,  

            // Braces
            200, 400,
            400, 400,

            // Eyes
            275, 350,
            325, 350
        ];

        this.particles = [];

        for (let i = 0; i < this.verticies.length; i += 2) {
            this.particles.push(new Particle(
                this.verticies[i], 
                this.verticies[i + 1], 
                ParticleRadius, 
                ParticleColor
            ))
        }

        this.springs = [];

        for (let p1 of this.particles) {
            for (let p2 of this.particles) {
                if (p1 === p2) continue;
                this.springs.push(
                    new Spring(
                        this.k, 
                        this.distBetween(
                            p1.pos.x, 
                            p1.pos.y, 
                            p2.pos.x, 
                            p2.pos.y
                        ), 
                        p1, 
                        p2
                    )
                );
            }
        }
    }

    update() {
        for (let s of this.springs)     s.update();
        for (let p of this.particles)   p.update();
    }

    show(ctx) {
        if (linesSelector.checked) {
            ctx.strokeStyle = "rgba(255,255,255,0.05";
            for (let s of this.springs) {
                s.show(ctx);
            }
        }

        if (particleSelector.checked) {
            for (let p of this.particles) {
                p.show(ctx);
            }
        }

        // Show body only
        const shownSprings = [3, 64, 80, 99, 160, 10];
        ctx.strokeStyle = "white";
        for (let i = 0; i < shownSprings.length; i++) {
            this.springs[shownSprings[i]].show(ctx);
        }
        this.particles[this.particles.length - 1].show(ctx);
        this.particles[this.particles.length - 2].show(ctx);
    }

    distBetween(x1, y1, x2, y2) {
        const xd = x1 - x2;
        const yd = y1 - y2;
        return Math.sqrt(xd * xd + yd * yd);
    }

    updateK(newK) {
        for (let s of this.springs) {
            s.k = newK;
        }
    }
}