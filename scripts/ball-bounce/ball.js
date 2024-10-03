// Each ball will have a different size, color, and bounciness //

class Ball {
  constructor(pos, radius, color, stopRatio) {
    this.gravity = (3 * scale) / fps;
    this.pos = { x: pos, y: pos };
    this.vel = { x: 0, y: 0 };
    this.acc = { x: 0, y: this.gravity };
    this.color = color;
    this.radius = radius * scale;
    this.stopRatio = stopRatio; // vertical velocity reduction
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
      this.vel.x *= this.friction;
    }
    // right Wall
    if (this.pos.x >= cL - this.radius) {
      this.vel.x *= this.stopRatio;
      this.pos.x = cL - this.radius;
      this.vel.y *= this.friction;
    }
    // left Wall
    if (this.pos.x <= this.radius) {
      this.vel.x *= this.stopRatio;
      this.pos.x = this.radius;
      this.vel.y *= this.friction;
    }
  }

  // changes the balls velocity based off of the html selectors
  launch(launchX, launchY) {
    this.vel.x += launchX;
    this.vel.y += launchY;
  }
}
