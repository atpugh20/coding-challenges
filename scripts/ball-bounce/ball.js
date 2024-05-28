// Each ball will have a different size, color, and bounciness //

class Ball {
  constructor(x, y, radius, color, stopRatio) {
    this.gravity = (9.8 * scale) / fps;
    this.pos = { x: x, y: y };
    this.vel = { x: 10, y: 0 };
    this.acc = { x: 0, y: this.gravity };
    this.color = color;
    this.radius = radius * scale;
    this.stopRatio = stopRatio; // vertical velocity reduction
    this.wallStopRatio = -0.7; // horizontal velocity reduction off wall
    this.friction = 0.98; // horizontal velocity reduction off ground
  }

  // draws the ball to the canvas
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }

  // applies both velocity and acceleration to the balls position
  // also invokes the check edge function
  update() {
    this.vel.x += this.acc.x;
    this.vel.y += this.acc.y;
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.checkEdge();
  }

  // when hitting the edge, a velocity reduction is applied, and the direction is reversed
  checkEdge() {
    // floor
    if (this.pos.y >= cL - this.radius) {
      this.vel.y *= this.stopRatio;
      this.pos.y = cL - this.radius;
      this.vel.x *= this.friction;
    }
    // ceiling
    if (this.pos.y <= this.radius) {
      this.vel.y *= this.stopRatio;
      this.pos.y = this.radius;
    }
    // right Wall
    if (this.pos.x >= cL - this.radius) {
      this.vel.x *= -0.7;
      this.pos.x = cL - this.radius;
      this.vel.y *= this.stopRatio * -1;
    }
    // left Wall
    if (this.pos.x <= this.radius) {
      this.vel.x *= -0.7;
      this.pos.x = this.radius;
      this.vel.y *= this.stopRatio * -1;
    }
  }
}
