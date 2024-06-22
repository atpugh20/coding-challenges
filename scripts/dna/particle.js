class Particle {
  constructor(x, y, size, color) {
    this.pos = { x: x, y: y };
    this.fakePos = { x: x, y: y }; // for sine and cosine
    this.size = size;
    this.color = color;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos.x, this.pos.y, this.size, this.size);
  }

  updateCos() {}
}
