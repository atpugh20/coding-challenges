class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.rays = [];
    this.rayCount = 0.1;
    for (let angle = 0; angle < 360; angle += this.rayCount) {
      this.rays.push(new Ray([this.x, this.y], angle));
    }
  }

  show(ctx, walls) {
    for (let ray of this.rays) {
      ray.cast(walls);
      ray.show(ctx);
    }
  }

  update(x, y) {
    this.x = x;
    this.y = y;

    for (let ray of this.rays) {
      ray.update(this.x, this.y);
    }
  }

  updateRayCount(rayCount) {
    this.rays = [];
    this.rayCount = rayCount;
    for (let angle = 0; angle < 360; angle += this.rayCount) {
      this.rays.push(new Ray([this.x, this.y], angle));
    }
  }
}
