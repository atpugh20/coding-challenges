class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.moveDistance = (2 * mS) / 630;
    this.turnAngleDeg = 2;
    this.rays = [];
    this.rayCount = 0.1;
    this.fov = 80;
    this.movementField = 2;
    this.dirDeg = 0;
    for (
      let angle = this.dirDeg - 180;
      angle < this.dirDeg + 180;
      angle += this.rayCount
    ) {
      this.rays.push(new Ray([this.x, this.y], angle));
    }
  }

  show(ctx, objects) {
    for (let ray of this.rays) {
      ray.cast(objects);
      if (ray.isInFov(this.dirDeg, this.fov)) {
        ray.show(ctx);
      }
    }
  }

  updateRayCount(rayCount) {
    this.rays = [];
    this.rayCount = rayCount;
    for (
      let angle = this.dirDeg - 180;
      angle < this.dirDeg + 180;
      angle += this.rayCount
    ) {
      this.rays.push(new Ray([this.x, this.y], angle));
    }
  }
  changeDirection(dir) {
    if (dir === 1) {
      this.dirDeg -= this.turnAngleDeg;
      this.dirDeg = this.dirDeg < 0 ? 360 - this.turnAngleDeg : this.dirDeg;
      this.updateRayCount(this.rayCount);
    } else {
      this.dirDeg += this.turnAngleDeg;
      this.dirDeg = this.dirDeg > 360 ? this.turnAngleDeg : this.dirDeg;
      this.updateRayCount(this.rayCount);
    }
  }
  move(dir, objects) {
    var obstacle = true;
    var dirRads = 0;
    if (dir === 1) {
      dirRads = (this.dirDeg * Math.PI) / 180;
      obstacle = this.checkForObstacle(this.dirDeg, objects);
    } else {
      const reverseAngle =
        this.dirDeg > 180 ? this.dirDeg - 180 : 180 + this.dirDeg;
      dirRads = (reverseAngle * Math.PI) / 180;
      obstacle = this.checkForObstacle(reverseAngle, objects);
    }
    if (!obstacle) {
      this.x += Math.cos(dirRads) * this.moveDistance;
      this.y += Math.sin(dirRads) * this.moveDistance;
      this.updateRayCount(this.rayCount);
    }
  }

  checkForObstacle(angleDeg, objects) {
    for (let ray of this.rays) {
      ray.cast(objects);
      if (ray.isInFov(angleDeg, this.movementField)) {
        if (ray.object.dist <= this.moveDistance) {
          return true;
        }
      }
    }
    return false;
  }
}
