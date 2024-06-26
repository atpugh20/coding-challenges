// Rays extend out from the particle and gather values for the view render //

class Ray {
  constructor(pos, angle) {
    this.color = "hsl(0, 0%, 100%)";
    this.dirRads = (angle * Math.PI) / 180;
    this.dirDeg = Number(angle.toFixed(1));
    this.length = canvas.width / 2.1;
    this.strength = 0.7;
    this.a = { x: pos[0], y: pos[1] };
    this.b = this.coordinateUpdate();
    this.oldB = this.coordinateUpdate();
    // this.objects = []; // can be used for multiple layers of rendering
    this.object = { obj: null, dist: Infinity };
  }

  // draws the ray on the canvas with a gradient color
  show(ctx) {
    const gradient = ctx.createLinearGradient(
      this.a.x,
      this.a.y,
      this.oldB.x, // the gradient uses oldB x/y to ensure that the gradient
      this.oldB.y // is proportional to the original length of the line
    );
    gradient.addColorStop(0, "hsl(0, 0%, 100%)");
    gradient.addColorStop(this.strength, this.color);
    gradient.addColorStop(this.strength, "transparent");

    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(this.a.x, this.a.y);
    ctx.lineTo(this.b.x, this.b.y);
    ctx.stroke();
  }

  // prepares the ray positions and calls the get intersection function
  cast(objects) {
    const x1 = this.a.x;
    const y1 = this.a.y;
    const x2 = this.b.x;
    const y2 = this.b.y;
    this.getIntersection(objects.boundaries, x1, y1, x2, y2);
  }

  // decides the color of the rendered wall based on its ray distance
  getObjectColor(distanceToObject, hsl, particle) {
    if (hsl === undefined) return "white";
    const splitColor = hsl.split(", ");
    const splitBrightness = splitColor[2].split("%");
    const maxBrightness = Number(splitBrightness[0]);
    let brightnessNum;
    const strength = Number(particle.rays[0].strength);
    const lightRange = particle.rays[0].length * strength;

    // Considers Ray Strength
    if (lightRange >= distanceToObject) {
      brightnessNum =
        maxBrightness - (distanceToObject / lightRange) * maxBrightness + 1;
    } else {
      brightnessNum = 0;
    }
    const newColor = `${splitColor[0]}, ${splitColor[1]}, ${brightnessNum}%)`;
    return newColor;
  }

  // checks each boundary to see if the ray intersects it. If it does, the ray stops at the wall
  // if not, it continues to extend to its maximum length
  //// formula: https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection, under section: Given two points on each line segment
  getIntersection(objectArray, x1, y1, x2, y2) {
    for (let object of objectArray) {
      let x3 = object.a.x;
      let y3 = object.a.y;
      let x4 = object.b.x;
      let y4 = object.b.y;
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
        // addLine.obj = object;
        if (newLine < oldLine) {
          this.object.obj = object;
          this.object.dist = newLine;
          this.b.x = newX;
          this.b.y = newY;
        }
      }
    }
  }

  // returns the coordinates that the ray extends out to (not the origin, but the end)
  coordinateUpdate() {
    return {
      x: this.a.x + Math.cos(this.dirRads) * this.length,
      y: this.a.y + Math.sin(this.dirRads) * this.length,
    };
  }

  // checks if the ray is in the FOV shown on the minimap
  // used for the wall rendering on the main canvas
  isInFov(particleDirDeg, particleFov) {
    var upperBound = particleDirDeg + particleFov / 2;
    var lowerBound = particleDirDeg - particleFov / 2;
    if (lowerBound < upperBound) {
      if (lowerBound < this.dirDeg && this.dirDeg < upperBound) {
        return true;
      }
    } else {
      if (
        (lowerBound <= this.dirDeg && this.dirDeg <= 360) ||
        (0 <= this.dirDeg && this.dirDeg <= upperBound)
      ) {
        return true;
      }
    }
    return false;
  }
}
