// A boundary is a linear wall that can stop a ray from extending further //
// Prevents particle from moving through it //
// One dimensional //

class Boundary {
  constructor(x1, y1, x2, y2) {
    this.a = { x: x1, y: y1 };
    this.b = { x: x2, y: y2 };
  }

  show(ctx) {
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(this.a.x, this.a.y);
    ctx.lineTo(this.b.x, this.b.y);
    ctx.stroke();
  }
}
