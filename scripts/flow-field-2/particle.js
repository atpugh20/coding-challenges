class Particle {
  constructor(cL, size, lifeLimit) {
    this.pos = {
      x: rand(canvas.width + 100) - 50,
      y: rand(canvas.height + 100) - 50,
    };
    this.vel = {
      x: 0,
      y: 0,
    };
    this.color = particleColors[rand(particleColors.length)];
    this.size = size;
    this.cL = cL; // canvas length
    this.lifeLimit = lifeLimit;
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
}
