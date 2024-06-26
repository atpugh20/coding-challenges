// Rays extend out from the particle. //

class Ray {
  constructor(pos, angle) {
    this.color = "white";
    this.dir = (angle * Math.PI) / 180; // converts degrees to radians
    this.length = 1000;
    this.strength = 0.7; // controls where the ray changes color with the gradient
    this.a = { x: pos[0], y: pos[1] };
    this.b = this.coordinateUpdate();
    this.oldB = this.coordinateUpdate(); // used for gradient calculation
  }

  // draws the ray on the canvas with a gradient color
  show(ctx) {
    const gradient = ctx.createLinearGradient(
      this.a.x,
      this.a.y,
      this.oldB.x, // the gradient uses oldB x/y to ensure that the gradient
      this.oldB.y // is proportional to the original length of the line
    );
    gradient.addColorStop(0, "white");
    gradient.addColorStop(this.strength, this.color);
    gradient.addColorStop(1, "transparent");

    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(this.a.x, this.a.y);
    ctx.lineTo(this.b.x, this.b.y);
    ctx.stroke();
  }

  // updates the origin of the ray
  update(x, y) {
    this.a.x = x;
    this.a.y = y;
    this.b = this.coordinateUpdate();
    this.oldB = this.coordinateUpdate();
  }

  // checks each wall to see if the ray intersects it. If it does, the ray stops at the wall
  // if not, it continues to extend to its maximum length
  //// formula: https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection, under section: Given two points on each line segment
  cast(walls) {
    const x1 = this.a.x;
    const y1 = this.a.y;
    const x2 = this.b.x;
    const y2 = this.b.y;
    for (let wall of walls) {
      let x3 = wall.a.x;
      let y3 = wall.a.y;
      let x4 = wall.b.x;
      let y4 = wall.b.y;

      const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
      if (den == 0) continue;

      const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
      const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

      if (0 <= t && t <= 1 && 0 <= u && u <= 1) {
        const newX = x1 + t * (x2 - x1);
        const newY = y1 + t * (y2 - y1);

        const oldLine = Math.sqrt(
          Math.abs(this.b.x - this.a.x) ** 2 +
            Math.abs(this.b.y - this.a.y) ** 2
        );
        const newLine = Math.sqrt(
          Math.abs(newX - x1) ** 2 + Math.abs(newY - y1) ** 2
        );
        if (newLine < oldLine) {
          this.b.x = newX;
          this.b.y = newY;
        }
      }
    }
  }

  // returns the coordinates that the ray extends out to (not the origin, but the end)
  coordinateUpdate() {
    return {
      x: this.a.x + Math.cos(this.dir) * this.length,
      y: this.a.y + Math.sin(this.dir) * this.length,
    };
  }
}
