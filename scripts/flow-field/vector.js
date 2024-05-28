// Vectors decide the flowfield paths //
// The direction of the vector is determined with perlin noise //

class Vector {
  constructor(x, y, size, xOff, yOff) {
    this.x = x;
    this.y = y;
    this.size = size;
    const noise = perlin.get(xOff, yOff);
    this.angle = noise * 2 * Math.PI;
  }

  // draws the vectors to the screen (if needed)
  show() {
    const newX = Math.cos(this.angle) * this.size + this.x;
    const newY = Math.sin(this.angle) * this.size + this.y;
    ctx.strokeStyle = "hsla(0,0%,100%,0.1)";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(newX, newY);
    ctx.stroke();
  }
}
