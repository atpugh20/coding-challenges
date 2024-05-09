class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.moveDistance = 1;
    this.turnAngleDeg = 30;
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

  show(ctx, walls) {
    for (let ray of this.rays) {
      ray.cast(walls);
      if (ray.isInFov(this.dirDeg, this.fov)) {
        ray.show(ctx);
      }
    }
  }

  update(x, y, walls) {
    this.x = x;
    this.y = y;
    this.fov = Number(document.getElementById("fov").value);

    for (let ray of this.rays) {
      ray.update(this.x, this.y, walls);
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

  changeDirection(dir, ctx, walls) {
    if (dir === 1) {
      this.dirDeg -= this.turnAngleDeg;
      this.dirDeg = this.dirDeg < 0 ? 360 - this.turnAngleDeg : this.dirDeg;
      this.updateRayCount(this.rayCount);
      this.show(ctx, walls);
    } else {
      this.dirDeg += this.turnAngleDeg;
      this.dirDeg = this.dirDeg > 360 ? this.turnAngleDeg : this.dirDeg;
      this.updateRayCount(this.rayCount);
      this.show(ctx, walls);
    }
  }
  move(dir, walls) {
    var obstacle = true;
    var dirRads = 0;
    if (dir === 1) {
      dirRads = (this.dirDeg * Math.PI) / 180;
      obstacle = this.checkForObstacle(this.dirDeg, walls);
      if (!obstacle) {
        this.x += Math.cos(dirRads) * this.moveDistance;
        this.y += Math.sin(dirRads) * this.moveDistance;
        this.update(this.x, this.y, walls);
      }
    } else {
      const reverseAngle =
        this.dirDeg > 180 ? this.dirDeg - 180 : 180 + this.dirDeg;
      dirRads = (reverseAngle * Math.PI) / 180;
      obstacle = this.checkForObstacle(reverseAngle, walls);
      if (!obstacle) {
        this.x += Math.cos(dirRads) * this.moveDistance;
        this.y += Math.sin(dirRads) * this.moveDistance;
        this.update(this.x, this.y, walls);
      }
    }
  }

  checkForObstacle(angleDeg, walls) {
    for (let ray of this.rays) {
      ray.cast(walls);
      if (ray.isInFov(angleDeg, this.movementField)) {
        if (ray.distanceToWall <= this.moveDistance) {
          return true;
        }
      }
    }
    return false;
  }
}
