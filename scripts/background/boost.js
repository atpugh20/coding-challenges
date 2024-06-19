// Boost comes from the ship, and is represented by a series of red rectangles

class Boost {
  constructor(x, y) {
    this.size = 3;
    this.pos = { x: x, y: y };
    this.startPos = { x: ship.pos.x + 80, y: ship.pos.y - 2 };
    this.color;
  }

  // draws the boost to the canvas
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

  // updates the position of the boost
  update(cW) {
    // if the boost is past the canvas, it will move back to the ship
    this.pos.x += 1;
    if (this.pos.x > ship.pos.x + 80 + boostParticles.length) {
      this.pos.x = ship.pos.x + 80 + 1;
      this.pos.y = ship.pos.y - 2;
    }
    const alpha = 1 / (this.pos.x - (ship.pos.x + 80));
    this.color = `rgba(255,0,0,${alpha})`;
  }
}
