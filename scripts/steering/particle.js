class Particle {
  constructor(x, y, size, color) {
    this.pos = { x: x, y: y };
    this.vel = { x: 0, y: 0 };
    this.acc = { x: 0, y: 0 };
    this.size = size;
    this.color = color;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos.x, this.pos.y, this.size, this.size);
  }

  updatePos() {
    this.vel.x += this.acc.x;
    this.vel.y += this.acc.y;
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.acc.x = 0;
    this.acc.y = 0;
  }

  applyForce() {
    
  }
}
