class Character {
    constructor() {
        this.particles = [
            new Particle(250, 150, 5, ParticleColor),
            new Particle(300, 200, 5, ParticleColor),
            new Particle(300, 300, 5, ParticleColor),
            new Particle(250, 350, 5, ParticleColor),
            new Particle(200, 300, 5, ParticleColor),
            new Particle(200, 200, 5, ParticleColor),
        ];

        this.springs = [
            new Spring(k, RestLength, this.particles[0], this.particles[1]),
            new Spring(k, RestLength, this.particles[1], this.particles[2]),
            new Spring(k, RestLength, this.particles[2], this.particles[3]),
            new Spring(k, RestLength, this.particles[3], this.particles[4]),
            new Spring(k, RestLength, this.particles[4], this.particles[5]),
            new Spring(k, RestLength, this.particles[5], this.particles[0]),

            new Spring(k, RestLength, this.particles[0], this.particles[2]),
            new Spring(k, RestLength, this.particles[0], this.particles[3]),
            new Spring(k, RestLength, this.particles[0], this.particles[4]),
            new Spring(k, RestLength, this.particles[1], this.particles[3]),
            new Spring(k, RestLength, this.particles[1], this.particles[4]),
            new Spring(k, RestLength, this.particles[1], this.particles[5]),
            new Spring(k, RestLength, this.particles[2], this.particles[4]),
            new Spring(k, RestLength, this.particles[2], this.particles[5]),
            new Spring(k, RestLength, this.particles[2], this.particles[0]),
            new Spring(k, RestLength, this.particles[3], this.particles[5]),
            new Spring(k, RestLength, this.particles[3], this.particles[0]),
            new Spring(k, RestLength, this.particles[3], this.particles[1]),
            new Spring(k, RestLength, this.particles[4], this.particles[0]),
            new Spring(k, RestLength, this.particles[4], this.particles[1]),
            new Spring(k, RestLength, this.particles[4], this.particles[2]),
            new Spring(k, RestLength, this.particles[5], this.particles[1]),
            new Spring(k, RestLength, this.particles[5], this.particles[2]),
            new Spring(k, RestLength, this.particles[5], this.particles[3]),
        ];
    }

    show(ctx) {
        for (let i = 0; i < this.springs.length; i++) {
            this.springs[i].update(); 
            // if (i < 6) {
                this.springs[i].show(ctx);
            // }
            
        }

        for (let p of this.particles) {
            p.update();
            p.show(ctx);
        }
    }
}