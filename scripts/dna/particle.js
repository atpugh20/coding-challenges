class Particle {
  constructor(x, y, size, color) {
    this.pos = { x: x, y: y };
    this.fakePos = { x: 0, y: 0 }; // for sine and cosine
    this.size = size;
    this.color = color;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos.x, this.pos.y, this.size, this.size);
  }

  updateCos() {
    this.pos.y = Math.cos(this.fakePos.x) * 80 + cH / 2;
    this.fakePos.x += 0.01;
  }

  updateSin() {
    this.pos.y = Math.sin(this.fakePos.x) * 80 + cH / 2;
    this.fakePos.x += 0.01;
  }
}
