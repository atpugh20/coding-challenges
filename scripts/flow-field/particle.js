// Particles follow the flowfield vectors, and draw their trail behind them //

class Particle {
  constructor(cL, color, mag, size) {
    this.pos = {
      x: Math.random() * cL,
      y: Math.random() * cL,
    };
    this.vel = {
      x: 0,
      y: 0,
    };
    this.acc = {
      x: 0,
      y: 0,
    };
    this.color = color;
    this.size = size;
    this.cL = cL; // canvas length
    this.mag = mag; // magnitude
  }

  // draws the particle to the canvas
  show(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  // gets the vector that is closest to it, and calls updatePosition
  follow(flowField, squareNum, scale) {
    const x = Math.floor(this.pos.x / scale);
    const y = Math.floor(this.pos.y / scale);
    const index = x + y * squareNum;
    this.updatePosition(flowField[index]);
  }

  // updates the particles position with the closest vector
  // magnitude determines how quickly they reach the flow lines
  updatePosition(force) {
    const newX = Math.cos(force.angle) * this.mag;
    const newY = Math.sin(force.angle) * this.mag;
    this.pos.x += newX;
    this.pos.y += newY;
  }

  // when a particle touches the edge, it returns to the edge opposite of it, similar to pacman
  edge() {
    if (this.pos.x > this.cL) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = this.cL;
    if (this.pos.y > this.cL) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = this.cL;
  }
}
