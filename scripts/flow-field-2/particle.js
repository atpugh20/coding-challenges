class Particle {
  constructor(cL, size) {
    this.pos = {
      x: Math.random() * cL,
      y: Math.random() * cL,
    };
    this.vel = {
      x: 0,
      y: 0,
    };
    this.color = particleColors[rand(particleColors.length)];
    this.size = size;
    this.cL = cL; // canvas length
    this.lifeLimit = 1000;
    this.life = rand(this.lifeLimit);
  }

  // draws the particle to the canvas
  show(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  // updates the particles position
  updatePosition() {
    const noise = perlin.get(this.pos.x / scale, this.pos.y / scale);
    const angle = noise * Math.PI * 2 * scale;
    this.vel.x = Math.cos(angle) * 0.2;
    this.vel.y = Math.sin(angle) * 0.2;
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.life++;
    if (this.life >= this.lifeLimit) {
      this.spawn();
    }
  }

  spawn() {
    this.pos = {
      x: Math.random() * this.cL,
      y: Math.random() * this.cL,
    };
    this.life = 0;
  }

  // when a particle touches the edge, it returns to the edge opposite of it, similar to pacman
  edge() {
    if (this.pos.x > this.cL) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = this.cL;
    if (this.pos.y > this.cL) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = this.cL;
  }
}
