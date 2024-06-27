class Particle {
  constructor(x, y, size, color) {
    this.pos = { x: x, y: y };
    this.vel = { x: 0, y: 0 };
    this.initialPos = { x: x, y: y };
    this.size = size;
    this.color = color;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos.x, this.pos.y, this.size, this.size);
  }

  // Applies velocity to position
  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  // Updates the particles velocity to move towards mX and mY
  updateVelocity(mX, mY) {
    const a = Math.atan2(mX - this.pos.x, mY - this.pos.y);
    this.vel.x += Math.sin(a);
    this.vel.y += Math.cos(a);
    // slows down the particle as it crosses mX and mY
    if (Math.sign(this.vel.x) != Math.sign(mX - this.pos.x)) this.vel.x *= 0.9;
    if (Math.sign(this.vel.y) != Math.sign(mY - this.pos.y)) this.vel.y *= 0.9;
  }
}
