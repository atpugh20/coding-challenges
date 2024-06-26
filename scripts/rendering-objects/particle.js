// A particle is the origin point of all rays //
// it is moved with the keyboard or the on screen buttons //

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.moveDistance = (2 * mS) / 630;
    this.turnAngleDeg = 2;
    this.rays = [];
    this.rayCount = 0.1; // the number of degrees between each ray
    this.fov = 80;
    this.movementField = 2;
    this.dirDeg = 90;
    this.updateRayCount(this.rayCount);
  }

  // checks if a ray is in the FOV, then shows the rays that are
  show(ctx) {
    for (let ray of this.rays) {
      if (ray.isInFov(this.dirDeg, this.fov)) {
        ray.show(ctx);
      }
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

  // moves the particle either forward or backward based on the FOV
  // does not move if there is an obstacle in the direction's movement field
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

  // checks if there is a boundary within the movement field
  // if there is, it returns true
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
