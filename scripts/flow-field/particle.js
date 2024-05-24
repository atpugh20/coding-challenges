class Particle {
  constructor(cL, color, mag, maxVel, size) {
    this.pos = {
      x: Math.random() * cL,
      y: Math.random() * cL,
    };
    this.vel = { x: 0, y: 0 };
    this.accel = { x: 0, y: 0 };
    this.color = color;
    this.size = size;
    this.cL = cL;
    this.mag = mag;
    this.maxVel = maxVel;
  }

  update() {
    this.vel.x += this.accel.x;
    this.vel.y += this.accel.y;
    if (this.vel.x > this.maxVel) this.vel.x = this.maxVel;
    if (this.vel.y > this.maxVel) this.vel.y = this.maxVel;
    if (this.vel.x < -this.maxVel) this.vel.x = -this.maxVel;
    if (this.vel.y < -this.maxVel) this.vel.y = -this.maxVel;
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.accel.x = 0;
    this.accel.y = 0;
  }

  show(ctx) {
    
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  follow(flowField, squareNum, scale) {
    const x = Math.floor(this.pos.x / scale);
    const y = Math.floor(this.pos.y / scale);
    const index = x + y * squareNum;
    this.applyForce(flowField[index]);
  }

  applyForce(force) {
    const newX = Math.cos(force.angle) * this.mag;
    const newY = Math.sin(force.angle) * this.mag;
    this.pos.x += newX;
    this.pos.y += newY;
  }

  edge() {
    if (this.pos.x > this.cL) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = this.cL;
    if (this.pos.y > this.cL) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = this.cL;
  }
}
