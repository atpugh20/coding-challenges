class Particle {
  /**
   * A particle is an object that moves around the canvas. The particles
   * will bounce off of other objects, including the edges of the canvas.
   */
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.vel = { x: Math.random() * 3 - 1, y: Math.random() * 3 - 1 };
    this.acc = { x: 0, y: 0 };
    this.mass = Math.floor(Math.random() * 5 + 1);
    this.radius = Math.sqrt(this.mass) * 5;
    this.color = color;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }

  update(canvasWidth, canvasHeight) {
    this.vel.x += this.acc.x;
    this.vel.y += this.acc.y;
    this.x += this.vel.x;
    this.y += this.vel.y;
    this.handleEdges(canvasWidth, canvasHeight);
  }

  collide(other) {
    /**
     * Handle when two particles collide with each other.
     */

    // Calculate distance between two center points
    const xDiff = (other.x - this.x) ** 2;
    const yDiff = (other.y - this.y) ** 2;
    let distance = Math.sqrt(Math.abs(xDiff + yDiff));

    if (distance < this.radius + other.radius) {
      let impact = { x: other.x - this.x, y: other.y - this.y };

      // Overlap Correction
      const overlap = distance - (this.radius + other.radius);
      const angleAway = Math.atan2(impact.y, impact.x);
      const newX = Math.cos(angleAway) * (overlap * 0.5);
      const newY = Math.sin(angleAway) * (overlap * 0.5);
      this.x += newX;
      this.y += newY;
      other.x -= newX;
      other.y -= newY;

      // Perform calculation for both in this

      // Collision Calculation
      distance = other.radius + this.radius;
      impact = { x: other.x - this.x, y: other.y - this.y };
      const mSum = this.mass + other.mass;
      const velDiff = {
        x: other.vel.x - this.vel.x,
        y: other.vel.y - this.vel.y,
      };
      const dot = velDiff.x * impact.x + velDiff.y * impact.y;

      // This particle
      const den = mSum * distance * distance;
      const deltaVA = {
        x: impact.x * ((2 * other.mass * dot) / den),
        y: impact.y * ((2 * other.mass * dot) / den),
      };
      this.vel.x += deltaVA.x;
      this.vel.y += deltaVA.y;

      // Other particle
      const deltaVB = {
        x: impact.x * ((-2 * this.mass * dot) / den),
        y: impact.y * ((-2 * this.mass * dot) / den),
      };

      other.vel.x += deltaVB.x;
      other.vel.y += deltaVB.y;
    }
  }

  handleEdges(canvasWidth, canvasHeight) {
    /**
     * Handles when the particle collides with the edge of the canvas.
     */
    if (this.x < this.radius) {
      this.x = this.radius;
      this.vel.x *= -1;
    } else if (this.x > canvasWidth - this.radius) {
      this.x = canvasWidth - this.radius;
      this.vel.x *= -1;
    }
    if (this.y < this.radius) {
      this.y = this.radius;
      this.vel.y *= -1;
    } else if (this.y > canvasHeight - this.radius) {
      this.y = canvasHeight - this.radius;
      this.vel.y *= -1;
    }
  }
}
