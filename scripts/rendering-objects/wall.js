// A wall is a series of boundaries organized in a rectangle/square //
// rendered on the map in 2 dimensions (length / width) //
// rendered on the main canvas with 3 dimensions //

class Wall {
  constructor(x, y, length, width, angleDegs, color) {
    this.x = x;
    this.y = y;
    this.angleDegs = angleDegs;
    this.angleRads = (this.angleDegs * Math.PI) / 180;
    this.length = length;
    this.width = width;
    this.height = 10;
    this.color = color;
    this.boundaries = [];
    this.type = "wall";
  }

  // positions each boundary based off of the
  // wall's position, angle, length, and width
  getBoundaries(ctx, type) {
    const x2 = this.length * Math.cos(this.angleRads) + this.x;
    const y2 = this.length * Math.sin(this.angleRads) + this.y;
    this.boundaries.push(
      new Boundary(this.x, this.y, x2, y2, this.color, this.height, this.type)
    );
    const x3 = this.width * Math.cos(this.angleRads + Math.PI / 2) + x2;
    const y3 = this.width * Math.sin(this.angleRads + Math.PI / 2) + y2;
    this.boundaries.push(
      new Boundary(x2, y2, x3, y3, this.color, this.height, this.type)
    );
    const x4 = this.length * Math.cos(this.angleRads + Math.PI) + x3;
    const y4 = this.length * Math.sin(this.angleRads + Math.PI) + y3;
    this.boundaries.push(
      new Boundary(x3, y3, x4, y4, this.color, this.height, this.type)
    );
    this.boundaries.push(
      new Boundary(x4, y4, this.x, this.y, this.color, this.height, this.type)
    );
    for (let boundary of this.boundaries) {
      boundary.show(ctx);
    }
    return this.boundaries;
  }
}
