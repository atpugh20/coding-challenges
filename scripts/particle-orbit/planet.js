class Planet {
  constructor(x, y, size, color) {
    this.pos = { x: x, y: y };
    this.vel = { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 };
    this.size = size;
    this.color = color;
  }

  // Draws a circle at the given planet's position
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

  // Applies the velocity to the planet
  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    // reverses velocity when hitting a wall
    if (this.pos.x > cW - this.size || this.pos.x < this.size) this.vel.x *= -1;
    if (this.pos.y > cH - this.size || this.pos.y < this.size) this.vel.y *= -1;
  }
}
