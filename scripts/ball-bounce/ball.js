class Ball {
  constructor(x, y, radius, color, stopRatio) {
    this.gravity = (9.8 * scale) / fps;
    this.pos = { x: x, y: y };
    this.vel = { x: 10, y: 0 };
    this.acc = { x: 0, y: this.gravity };
    this.color = color;
    this.radius = radius * scale;
    this.stopRatio = stopRatio;
    this.wallStopRatio = -0.7;
    this.friction = 0.98;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }

  update(frame) {
    this.vel.x += this.acc.x;
    this.vel.y += this.acc.y;
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.checkEdge();
  }

  checkEdge() {
    if (this.pos.y >= cL - this.radius) {
      this.vel.y *= this.stopRatio;
      this.pos.y = cL - this.radius;
      this.vel.x *= this.friction;
    }
    if (this.pos.y <= this.radius) {
      this.vel.y *= this.stopRatio;
      this.pos.y = this.radius;
    }
    if (this.pos.x >= cL - this.radius) {
      this.vel.x *= -0.7;
      this.pos.x = cL - this.radius;
      this.vel.y *= this.stopRatio * -1;
    }
    if (this.pos.x <= this.radius) {
      this.vel.x *= -0.7;
      this.pos.x = this.radius;
      this.vel.y *= this.stopRatio * -1;
    }
  }
}
