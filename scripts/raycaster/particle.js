// A particle is the origin point of all rays //
// It will follow the mouse //

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.rays = [];
    this.rayCount = 2.1; // the number of degrees between each ray
    for (let angle = 0; angle < 360; angle += this.rayCount) {
      this.rays.push(new Ray([this.x, this.y], angle));
    }
  }

  // invokes each rays cast function, then draws them all to the canvas
  show(ctx, walls) {
    for (let ray of this.rays) {
      ray.cast(walls);
      ray.show(ctx);
    }
  }

  // updates the position of the particle
  update(x, y) {
    this.x = x;
    this.y = y;

    for (let ray of this.rays) {
      ray.update(this.x, this.y);
    }
  }

  // updates the number of rays coming from the particle
  updateRayCount(rayCount) {
    this.rays = [];
    this.rayCount = rayCount;
    for (let angle = 0; angle < 360; angle += this.rayCount) {
      this.rays.push(new Ray([this.x, this.y], angle));
    }
  }
}
