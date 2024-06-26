class Particle {
  constructor(x, y, z, size, hue) {
    this.pos = { x: x, y: y, z: z };
    this.fakePos = { x: x, y: y, z: z }; // for sine and cosine
    this.size = size;
    this.hue = hue;
  }

  draw(ctx) {
    const distanceColor = `hsl(${this.hue}, 100%, ${this.pos.z / 5}%)`;
    ctx.fillStyle = distanceColor;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

  updatePos1() {
    this.pos.y = Math.sin(this.fakePos.x * crestRate) * waveHeight + cH / 2;
    this.pos.z = Math.cos(this.fakePos.x * crestRate) * waveHeight + cH / 2;
    this.fakePos.x++;
  }

  updatePos2() {
    this.pos.y =
      Math.sin(this.fakePos.x * crestRate + 3.1) * waveHeight + cH / 2;
    this.pos.z =
      Math.cos(this.fakePos.x * crestRate + 3.1) * waveHeight + cH / 2;
    this.fakePos.x++;
  }
}
