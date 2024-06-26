// A particle is the origin point of all rays //
// it is moved with the keyboard //

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.moveDistance = 1;
    this.turnAngleDeg = 22.5;
    this.rays = [];
    this.rayCount = 0.1; // the number of degrees between each ray
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

  // invokes each rays cast function, then draws them all to the canvas
  show(ctx, walls) {
    for (let ray of this.rays) {
      ray.cast(walls);
      if (ray.isInFov(this.dirDeg, this.fov)) {
        ray.show(ctx);
      }
    }
  }

  // updates the position and FOV of the particle
  update(x, y, walls) {
    this.x = x;
    this.y = y;
    this.fov = Number(document.getElementById("fov").value);

    for (let ray of this.rays) {
      ray.update(this.x, this.y, walls);
    }
  }

  // updates the number of rays coming from the particle
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

  // turns the FOV of the particle
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

  // moves the particle either forward or backward based on the FOV
  // does not move if there is an obstacle in the direction's movement field
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

  // checks if there is a wall within the movement field, if there is, it returns true
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
