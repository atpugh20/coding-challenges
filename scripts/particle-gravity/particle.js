class Particle {
  constructor(x, y, size, color) {
    this.pos = { x: x, y: y };
    this.vel = { x: 0, y: 0 };
    this.size = size;
    this.color = color;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  updateVelocity(mX, mY) {
    this.vel.x -= Math.tan(this.pos.x - mX);
    this.vel.y -= Math.tan(this.pos.y - mY);
  }
}
