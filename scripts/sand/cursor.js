class Cursor {
  constructor(x, y, particleSize, colorCode) {
    this.x = x;
    this.y = y;
    this.pS = particleSize;
    this.colors = [
      `hsl(${colorCode}, 61%, 50%)`,
      `hsl(${colorCode}, 75%, 50%)`,
      `hsl(${colorCode}, 86%, 50%)`,
      `hsl(${colorCode}, 50%, 50%)`,
    ];
  }

  draw(ctx) {
    ctx.fillStyle = this.colors[0];
    ctx.fillRect(this.x + this.pS, this.y, this.pS, this.pS);
    ctx.fillRect(this.x, this.y + this.pS, this.pS, this.pS);
    ctx.fillRect(this.x, this.y - this.pS, this.pS, this.pS);
    ctx.fillRect(this.x - this.pS, this.y, this.pS, this.pS);
  }
}
