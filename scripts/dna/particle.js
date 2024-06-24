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

  updateCos() {
    this.pos.y = Math.cos(this.fakePos.x * crestRate) * waveHeight + cH / 2;
    this.fakePos.x++;
  }

  updateSin() {
    this.pos.y =
      Math.sin(this.fakePos.x * crestRate + 4.7) * waveHeight + cH / 2;
    this.fakePos.x++;
  }
}
